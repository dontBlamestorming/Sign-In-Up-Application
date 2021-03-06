import React from "react";
import { Container, Button, Card } from "react-bootstrap";

function FirstPage() {
  return (
    <Container>
      <Card className="mb-3" style={{ color: "#000" }}>
        <Card.Img
          className="imgWelcome"
          variant="top"
          src="images/welcome.jpg"
          alt="welcome"
        />
        <Card.Body>
          <Card.Title>Congratulation</Card.Title>
          <Card.Text>You have successfully logged in.</Card.Text>

          <Button variant="success" block size="md">
            <a
              href="https://github.com/dontBlamestorming/Sign-In-Up-Application"
              style={{ color: "#FFF" }}
            >
              Please visit my Github page!
            </a>
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FirstPage;
