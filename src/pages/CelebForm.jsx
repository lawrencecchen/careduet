import React from 'react';
import Form from 'react-bootstrap/Form';

const CelebForm = () => {
  return (
    <div className="form-wrapper">
      <h2>Book a CareDuet video with Lawrence Chen</h2>
      <Form className="form">
        <Form.Group>
          <div className="form-inline">
            <div className="to-form">
              <Form.Label htmlFor="to">To</Form.Label>
              <Form.Control type="input" id="to" />
            </div>
            <div className="from-form">
              <Form.Label htmlFor="from">From</Form.Label>
              <Form.Control type="input" id="from" />
            </div>
          </div>
          <Form.Label htmlFor="from">Your Instructions for Lawrence</Form.Label>
          <Form.Control type="input" />
        </Form.Group>
      </Form>
    </div>
  );
};

export default CelebForm;
