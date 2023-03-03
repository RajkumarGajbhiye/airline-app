import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/Editdetails.css";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


const Editdetails = () => {
  let { _id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    _id: "",
    name: "",
    country: "",
    slogan: "",
    established: "",
  });

  //get data
  useEffect(() => {
    axios
      .get(`http://localhost:7000/details/${_id}`)
      .then((response) => {
        console.log(response.data.data);
        setState(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  //edit data
  const populateData = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:7000/details", state)
      .then((response) => {
        console.log(response.data);
        setState(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
      alert("Data has updated successfully.......")
      navigate("/home");
  };

  return (
    <div>
      <h2>Edit Airline Details</h2>
      <div className="box">
        <div className="form">
          <Form onSubmit={populateData}>
            <Form.Group className="mb-3" controlId="formBasicId">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Id"
                value={state?._id}
                name={"_id"}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Aireline Name"
                value={state?.name}
                name={"name"}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country Name"
                value={state?.country}
                name={"country"}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSlogan">
              <Form.Label>Slogan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Slogan"
                value={state?.slogan}
                name={"slogan"}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEstablished">
              <Form.Label>Established</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Establishment year"
                value={state?.established}
                name={"established"}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Update
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Editdetails;
