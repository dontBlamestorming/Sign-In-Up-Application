import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { signIn } from "../auth";
import "./LoginForm.css";

// Single Components
import { Container, Button, Alert, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm({ authed, getStatus }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [allNeededInfo, setAllNeededInfo] = useState(null);

  const handleChangedValue = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // refresh 방지
    if (allNeededInfo) {
      signIn(values.email, values.password, getStatus);
    } else {
      setAllNeededInfo(false);
    }
  };

  useEffect(() => {
    if (values.email && values.password) {
      setAllNeededInfo(true);
    } else {
      setAllNeededInfo(null);
    }
  }, [values.email, values.password]);

  if (authed) return <Redirect to="/sucessSignIn" />;

  return (
    <article className="signIn">
      <Container>
        <Row>
          <Col>
            <Form className="loginForm" onSubmit={handleFormSubmit}>
              <h1>Login Page</h1>

              {/* 이메일 입력 창 */}
              <Form.Group className="signInEmail" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="Please enter email"
                  onChange={handleChangedValue}
                />
              </Form.Group>

              {/* 비밀번호 입력 창 */}
              <Form.Group className="signInPassword" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Please enter password"
                  onChange={handleChangedValue}
                />
              </Form.Group>

              <p className="createAccount">
                Not registered? <Link to="/signUp">Create an account</Link>
              </p>

              {/* Sign in button */}
              <Button
                className="signInBtn"
                variant="dark"
                type="submit"
                size="lg"
                block
              >
                Sign In
              </Button>

              {/* 잘못된 정보 입력한 경우의 Alert */}
              {authed === false ? (
                <Alert className="alertSignIn" variant="danger" size="sm">
                  Incorrect email or password.
                </Alert>
              ) : null}

              {/* 필수입력사항 입력여부의 Alert */}
              {allNeededInfo === false ? (
                <Alert className="alertSignIn" variant="danger" size="sm">
                  The required fields were not completed
                </Alert>
              ) : null}
            </Form>
          </Col>
        </Row>
      </Container>
    </article>
  );
}

export default LoginForm;
