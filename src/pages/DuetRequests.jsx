import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import RespondDuetRequest from './RespondDuetRequest';

const DuetRequestsWrapper = styled.div`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const DuetRequests = () => {
  const [careduetRequests, setCareduetRequests] = useState([]);
  const { path, url } = useRouteMatch();

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    onSubmit: ({ username }) => {
      db.collection('celebs')
        .doc(username)
        .onSnapshot((doc) => {
          const data = doc.data();

          const { careduetRequests } = data;
          console.log(careduetRequests);

          const careduetRequestsPromises = careduetRequests.map(
            (careduetRequest) => {
              const documentId = careduetRequest.split('/')[2];
              const docRef = db.collection('careduets').doc(documentId);
              console.log('documentid', documentId);

              return docRef.get().then((doc) => {
                if (doc.exists) {
                  const data = doc.data();
                  console.log(doc.data());
                  const mapData = {
                    description: data.description || '',
                    senderName: data.senderName || '',
                    senderVideoId: data.senderVideoId || '',
                    recipientTwitterHandle: data.recipientTwitterHandle || '',
                  };
                  return mapData;
                } else {
                  // doc.data() will be undefined in this case
                  console.log('No such document!');
                }
              });
            },
          );
          Promise.all(careduetRequestsPromises).then((results) => {
            setCareduetRequests(results);
          });
        });
    },
  });

  return (
    <Switch>
      <Route exact path={path}>
        <DuetRequestsWrapper>
          <h2>Duet Requests</h2>
          <div>Subscribing to requests for </div>
          <form onSubmit={formik.handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3" htmlFor="username">
                Username
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  id="username"
                  placeholder="billgates"
                  as="input"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </Col>
            </Form.Group>
            <Button type="submit">Go</Button>
          </form>
          <Table className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Description</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {careduetRequests.map(
                (
                  {
                    senderName,
                    recipientTwitterHandle,
                    description,
                    senderVideoId,
                  },
                  index,
                ) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{senderName}</td>
                    <td>{recipientTwitterHandle}</td>
                    <td>{description}</td>
                    <td>
                      <Link
                        to={`${url}/${senderVideoId}?twitterHandle=${recipientTwitterHandle}`}
                      >
                        <Button>Go</Button>
                      </Link>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </Table>
        </DuetRequestsWrapper>
      </Route>
      <Route path={`${path}/:senderVideoId`}>
        <RespondDuetRequest />
      </Route>
    </Switch>
  );
};

export default DuetRequests;
