import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container>
      <Card className="mb-3" style={{ color: "#000" }}>
        <Card.Img
          className="imgNotFound"
          variant="top"
          src="images/404Page.jpg"
          alt="404 error picture"
        />
        <Card.Body>
          <Card.Title>404. That's an error.</Card.Title>
          <Card.Text>The requested URL was not found on this server.</Card.Text>
          <Link to="/">
            <Button variant="dark" block size="md">
              Please go back to login page
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFound;
