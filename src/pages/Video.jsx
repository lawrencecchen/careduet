import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { storage, auth, db } from '../firebase/firebase';
import { RiRecordCircleLine, RiStopCircleLine } from 'react-icons/ri';
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import Modal from 'react-bootstrap/Modal';

const videoConstraints = {
  facingMode: 'user',
};

const StyledForm = styled(Form)`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const VideoWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr;
  border-color: black;
  grid-template-areas: 'celebrity video';
  padding-left: 49px;
`;

const SelectedCelebWrapper = styled.div`
  grid-area: celebrity;
`;

const RecordVideoWrapper = styled.div`
  grid-area: video;
`;

const StyledImage = styled.img`
  width: 250px;
  border-width: 5px;
  border-color: black;
  outline-color: black;
  border-style: solid;
  height: 250px;
  border-radius: 200%;
  object-fit: cover;
`;

const StyledWebcam = styled(Webcam)`
  border-width: 5px;
  border-style: solid;

  border-color: black;
`;

const Video = ({ targetCelebData }) => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const formik = useFormik({
    initialValues: {
      description: '',
      recipientTwitterHandle: '',
    },
    onSubmit: ({ description, recipientTwitterHandle }) => {
      const senderVideoId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      if (recordedChunks.length > 0) {
        const name = senderVideoId + '';
        const blob = new Blob(recordedChunks, { type: 'video/mp4' });

        auth.onAuthStateChanged((user) => {
          if (user) {
            const storageRef = storage.ref().child(name);

            storageRef.put(blob).then((snapshot) => {
              console.log('Uploaded a blob or a file!');
              setMessage('Your video has been uploaded!');
              handleShow();
              const careduetData = {
                celebUserName: targetCelebData.username,
                celebVideoId: '',
                recipientTwitterHandle: recipientTwitterHandle,
                senderName: user.displayName,
                senderEmail: user.email,
                senderVideoId: senderVideoId,
                description,
              };

              db.collection('careduets')
                .add(careduetData)
                .then(function (docRef) {
                  console.log('Document written with ID: ', docRef.id);
                })
                .catch(function (error) {
                  console.error('Error adding document: ', error);
                });
            });
          } else {
            setMessage('Please sign in before submitting a video.');
            handleShow();
          }
        });
      } else {
        setMessage(
          "Sorry, your careduet wasn't sent. Something happened on our servers.",
        );
        handleShow();
        console.log('Something happened on our servers.');
      }
    },
  });

  if (!targetCelebData) {
    return <Redirect to="/" />;
  }

  return (
    <VideoWrapper>
      <SelectedCelebWrapper className="celeb-divider">
        <h2 className="celeb-record">
          With{' '}
          <span className="celeb-name">
            {' '}
            {targetCelebData.firstName} {targetCelebData.lastName}{' '}
          </span>
        </h2>
        <div className="pfp">
          <StyledImage
            src={targetCelebData.profileUrl}
            alt={targetCelebData.username}
          />
        </div>
      </SelectedCelebWrapper>
      <RecordVideoWrapper className="celeb-divider">
        <h2 className="celeb-record">Record Video</h2>
        <StyledWebcam
          audio
          mirrored
          videoConstraints={videoConstraints}
          width="500px"
          ref={webcamRef}
        />

        <StyledForm onSubmit={formik.handleSubmit}>
          {capturing ? (
            <Button
              variant="danger"
              onClick={handleStopCaptureClick}
              style={{
                background: 'linear-gradient(to right, #429ea6, #7180b9)',
                border: 'none',
                marginBottom: '20px',
              }}
            >
              Stop Capture <RiStopCircleLine />
            </Button>
          ) : (
            <Button
              style={{
                background: 'linear-gradient(to right, #429ea6, #7180b9)',
                border: 'none',
                marginBottom: '20px',
              }}
              onClick={handleStartCaptureClick}
            >
              Start Capture <RiRecordCircleLine />
            </Button>
          )}
          <Form.Group as={Row}>
            <Form.Label column sm="3" htmlFor="description">
              Description
            </Form.Label>
            <Col sm="7">
              <Form.Control
                type="text"
                id="description"
                placeholder="Description"
                as="textarea"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3" htmlFor="recipientTwitterHandle">
              Recipient's twitter
            </Form.Label>
            <Col sm="7">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="input"
                  type="text"
                  id="recipientTwitterHandle"
                  placeholder="Twitter Handle"
                  onChange={formik.handleChange}
                  value={formik.values.recipientTwitterHandle}
                />
              </InputGroup>
            </Col>
          </Form.Group>

          <Button
            variant="info"
            type="submit"
            disabled={recordedChunks.length === 0}
          >
            Send CareDuet
          </Button>
        </StyledForm>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Notifcation</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </RecordVideoWrapper>
    </VideoWrapper>
  );
};

export default Video;
