import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLoginSuccess(true);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError("User not found. Please register first.");
        } else if (error.code === "auth/wrong-password") {
          setError(
            "Invalid password. Please check your password and try again."
          );
        } else if (error.code === "auth/weak-password") {
          setError("Weak password. Minimum 6 characters required.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="login-container">
      <h1>Login</h1>
      {loginSuccess && (
        <div>
          <Alert variant="success">Login successful!</Alert>
          <p>You are now logged in.</p>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
      {!loginSuccess && (
        <Form onSubmit={handleLogin}>
          {error && <Alert variant="danger">{error}</Alert>}
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
            Login
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default Login;
