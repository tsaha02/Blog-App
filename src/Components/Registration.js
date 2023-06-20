import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { auth, database } from "../firebase/firebase";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [error, setError] = useState(null);

  const handleRegistration = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        database.ref("users/" + user.uid).set({
          email: user.email,
        });
        setRegistrationSuccess(true);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setAlreadyRegistered(true);
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <Container className="registration-container">
      <h1>Registration</h1>
      {registrationSuccess && (
        <div>
          <Alert variant="success">Registration successful!</Alert>
        </div>
      )}
      {alreadyRegistered && (
        <Alert variant="info">
          You are already registered. Please log in instead.
        </Alert>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!registrationSuccess && !alreadyRegistered && (
        <Form onSubmit={handleRegistration}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default Registration;
