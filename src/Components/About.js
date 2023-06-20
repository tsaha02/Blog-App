import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <div className="about-background">
      <Container className="about-container">
        <h1 className="text-center mt-4 about-heading">About</h1>

        <Row className="mt-4">
          <Col>
            <h2 className="about-subheading">Methods Used</h2>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h4 className="about-title">React</h4>
            <p className="about-description">
              The blog app is built using React, a JavaScript library for
              building user interfaces. React allows for efficient
              component-based development, making it easier to manage and update
              different parts of the application.
            </p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h4 className="about-title">React Bootstrap</h4>
            <p className="about-description">
              React Bootstrap is used for styling the components in the blog
              app. It provides pre-built components and responsive design,
              allowing for quick and easy styling of the application.
            </p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h4 className="about-title">API Integration</h4>
            <p className="about-description">
              The blog app utilizes the DEV API to fetch the latest blogs and
              search for specific topics. The API integration allows for dynamic
              content retrieval and display in the application.
            </p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h4 className="about-title">Component-based Architecture</h4>
            <p className="about-description">
              The blog app follows a component-based architecture, where
              different parts of the application are broken down into reusable
              components. This approach makes the code more modular,
              maintainable, and scalable.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
