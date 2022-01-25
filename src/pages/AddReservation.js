import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Formik } from 'formik';
import { Form, Button, Offcanvas } from 'react-bootstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import NavPanel from '../components/NavPanel';
import lunar from '../images/lunar.png';
import './addReservation.css';

const validationSchema = Yup.object().shape({

  city: Yup.string()
    .min(2, '*City must have at least 2 characters')
    .max(25, '*City can\'t be longer than 25 characters')
    .required('*Hotel city is required'),

  check_in: Yup.date().required('*Check In date is required'),
  check_out: Yup.date().required('*Check Out date is required'),
});

const AddReservation = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="form-container1">
      <div className="fullScreen">
        <div className="p-2 vis">
          <FontAwesomeIcon icon={faBars} onClick={handleShow} className="text-white" />
        </div>
        <div className="txtWrapper">
          <h1 className="upperCase txtWhite fs-1">Book a reservation</h1>
          <p className="txtWhite">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            erat massa, accumsan a porta quis, faucibus et mi. Curabitur
            cursus nulla eu magna posuere, sit amet fringilla orci elementum.
          </p>

          <Formik
            initialValues={{
              city: '',
              check_in: '',
              check_out: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              resetForm();
              setSubmitting(false);
              navigate('/reservations');
            }}
          >

            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} className="mx-auto row row-cols-2 row-cols-lg-4 mt-3 d-flex justify-content-center align-items-center">
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    aria-label="Select Hotel City Field"
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    className="{touched.city && errors.city ? 'error' : null} form-radius"
                  >
                    <option>Select Hotel City</option>
                    <option value="Lusaka">Lusaka</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Morocco">Morocco</option>
                  </Form.Select>
                  {touched.city && errors.city ? (
                    <div className="error-message-white">{errors.city}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="FormCheckIn">
                  <Form.Label>Check In</Form.Label>
                  <Form.Control
                    type="date"
                    name="check_in"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rate}
                    className="{touched.check_in && errors.check_in ? 'error' : null} form-radius"
                  />
                  {touched.check_in && errors.check_in ? (
                    <div className="error-message-white">{errors.check_in}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="FormCheckIn">
                  <Form.Label>Check Out</Form.Label>
                  <Form.Control
                    type="date"
                    name="check_out"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.check_out}
                    className="{touched.check_out && errors.check_out ? 'error' : null} form-radius"
                  />
                  {touched.check_out && errors.check_out ? (
                    <div className="error-message-white">{errors.check_out}</div>
                  ) : null}
                </Form.Group>
                <Button type="submit" disabled={isSubmitting} className="upperCase resBtn">
                  Reserve
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Offcanvas className="darkened-off" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><img src={lunar} className="lunar-logo-m" alt="Lunar Hotel Logo" /></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavPanel />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AddReservation;
