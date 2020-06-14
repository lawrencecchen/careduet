import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { storage, db } from '../firebase/firebase';
import { RiRecordCircleLine, RiStopCircleLine } from 'react-icons/ri';
import { useFormik } from 'formik';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RespondDuetRequest = () => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const query = useQuery();
  const { senderVideoId } = useParams();

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
    initialValues: {},
    onSubmit: () => {
      if (recordedChunks.length > 0) {
        const celebVideoId =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        const name = celebVideoId + '';
        const blob = new Blob(recordedChunks, { type: 'video/mp4' });

        const storageRef = storage.ref().child(name);

        storageRef.put(blob).then((snapshot) => {
          console.log('Uploaded a blob or a file!');
          setMessage(
            "Your duet has been uploaded. It's on it's way to twitter now!",
          );

          db.collection('completedDuets').add({
            senderVideoId: senderVideoId,
            celebVideoId: celebVideoId,
            twitterHandle: query.get('twitterHandle'),
          });
          handleShow();
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

  useEffect(() => {
    const storageRef = storage.refFromURL('gs://careduet-bebed.appspot.com');
    storageRef
      .child(`${senderVideoId}`)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setVideoUrl(url);
      });
  }, [senderVideoId]);

  return (
    <VideoWrapper>
      <SelectedCelebWrapper className="celeb-divider">
        <h2 className="celeb-record">Sender's video</h2>
        <span className="celeb-name" style={{}}>
          <video
            width="500"
            height="285"
            controls
            autoPlay={false}
            src={videoUrl}
          >
            {/* <source src={videoUrl} type="video/mp4" /> */}
            {/* <source src={videoUrl} type="video/mp4"></source> */}
            {/* <source src={videoUrl} type="video/mp4"></source> */}
            Your browser does not support the video tag.
          </video>
        </span>
        <div>
          <a
            style={{
              fontSize: '12px',
              color: 'blue',
            }}
            href={videoUrl}
            target="_blank"
          >
            Link to video
          </a>
        </div>
      </SelectedCelebWrapper>
      <RecordVideoWrapper className="celeb-divider">
        <h2 className="celeb-record">Record Your Video</h2>
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
          <div>
            <Button
              variant="info"
              type="submit"
              disabled={recordedChunks.length === 0}
            >
              Send CareDuet
            </Button>
          </div>
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

export default RespondDuetRequest;
