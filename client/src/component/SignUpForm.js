import React, { useState, useEffect } from "react";
import "./SignUpForm.css";
import { doesIdDuplicate, signUp } from "../auth";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

// Single Components
import { Container, Button, Alert, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUpForm({ authed, getStatus }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    checkPassword: "",
    gender: "",
    yy: "",
    mm: "",
    dd: "",
  });
  const [samePassword, setSamePassword] = useState(null);
  const [duplicate, setDuplicate] = useState(null);
  const [allNeededInfo, setAllNeededInfo] = useState(null);

  const isDuplicate = (e) => {
    e.preventDefault();
    doesIdDuplicate(values.email, setDuplicate);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (allNeededInfo) {
      signUp(values, getStatus);
    } else {
      setAllNeededInfo(false);
    }
  };

  // 사용자가 정보 입력시 values에 저장
  const handleChangedValue = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // 비밀번호 동일여부 판단
  useEffect(() => {
    let isSamePassword;

    if (values.checkPassword !== "") {
      if (values.password === values.checkPassword) {
        isSamePassword = true;
      } else {
        isSamePassword = false;
      }
    }

    setSamePassword(isSamePassword);
  }, [values.password, values.checkPassword]);

  // 필요한 정보를 모두 넣었는지 판단
  useEffect(() => {
    if (samePassword && duplicate && values.yy && values.mm && values.dd) {
      // 모든 유효한 저보가 기입되었다면
      setAllNeededInfo(true);
    } else {
      setAllNeededInfo(null);
    }
  }, [samePassword, duplicate, values.yy, values.mm, values.dd, values.gender]);

  if (authed) return <Redirect to="/sucessSignIn" />;

  const genMonth = () => {
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const monthList = month.map((m, i) => {
      return (
        <option key={i} value={m}>
          {m}
        </option>
      );
    });

    return monthList;
  };

  const handleBirthInfo = (e) => {
    const { name, value } = e.target;
    const birthInfo = e.target.validity.valid ? value : values[name];
    setValues({ ...values, [name]: birthInfo });
  };

  return (
    <article className="signUp">
      <Container>
        <h1>Sign Up Page</h1>

        <Form className=" signUpForm" onSubmit={handleFormSubmit}>
          {/* 이메일 입력 및 중복체크 */}
          <Form.Group
            className="signUpEmail d-flex flex-wrap"
            controlId="formEmail"
          >
            <Form.Label className="labelEmail">Email Address</Form.Label>

            {/* 아이디 유효성 검사(중복체크) 버튼 */}
            <Button
              className="checkEmailBtn"
              variant="dark"
              type="button"
              size="sm"
              onClick={isDuplicate}
            >
              Check Availability
            </Button>

            {/* 이메일 입력 창 */}
            <Form.Control
              className="emailInput"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChangedValue}
            />

            {/* 유효성 검사 결과의 Alert */}
            {duplicate === true ? (
              <Alert className="alertSignUp w-100" variant="primary">
                Available!
              </Alert>
            ) : null}

            {duplicate === false ? (
              <Alert className="alertSignUp w-100" variant="danger">
                Please try another email. This one already in use.
              </Alert>
            ) : null}
          </Form.Group>

          {/* 비밀번호 입력 창 */}
          <Form.Group className="passwordSignUp" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChangedValue}
            />
          </Form.Group>

          {/* 동일한 비밀번호 유효성 검사 */}
          <Form.Group className="checkPassword" controlId="formCheckPassword">
            <Form.Label>Reconfirm Password</Form.Label>
            <Form.Control
              className="checkPassword"
              type="password"
              name="checkPassword"
              value={values.checkPassword}
              onChange={handleChangedValue}
            />

            {/* 동일한 비밀번호인지 판단 여부의 Alert */}
            {samePassword === true ? (
              <Alert className="alertSignUp" variant="primary">
                Password correct!
              </Alert>
            ) : null}
            {samePassword === false ? (
              <Alert className="alertSignUp" variant="danger">
                Please make sure your passwords match.
              </Alert>
            ) : null}
          </Form.Group>

          {/* 성벽 입력  */}
          <Form.Group className="d-flex">
            <div className="w-50" xs={6}>
              <Form.Label>Male</Form.Label>
              <Form.Check
                className="maleBtn"
                type="radio"
                name="gender"
                value="male"
                onChange={handleChangedValue}
              />
            </div>

            <div className="w-50" xs={6}>
              <Form.Label className="">Female</Form.Label>
              <Form.Check
                className="femaleBtn"
                type="radio"
                name="gender"
                value="female"
                onChange={handleChangedValue}
              />
            </div>
          </Form.Group>

          {/* 생년월일 입력 */}
          <Form.Group className="d-flex flex-wrap">
            <Form.Label className="test">Birth Date</Form.Label>

            <div className="d-flex">
              <Form.Control
                className="year"
                name="yy"
                type="text"
                pattern="[0-9]*"
                value={values.yy}
                maxLength="4"
                placeholder="Year"
                onChange={handleBirthInfo}
              />

              <Form.Control
                className="month"
                name="mm"
                as="select"
                placeholder="Year"
                onChange={handleBirthInfo}
                value={values.mm}
              >
                <option hidden value="" disabled>
                  Month
                </option>
                {genMonth()}
              </Form.Control>

              <Form.Control
                className="day"
                name="dd"
                type="text"
                pattern="[0-9]*"
                value={values.dd}
                maxLength="2"
                placeholder="Day"
                onChange={handleBirthInfo}
              />
            </div>
          </Form.Group>

          {/* Sign up button */}
          <Button
            className="signUpBtn"
            type="submit"
            variant="dark"
            block
            size="lg"
          >
            Sign Up
          </Button>
          <p className="createAccount">
            Already have an account? <Link to="/">Login Now!</Link>
          </p>
        </Form>

        {/* 필수입력사항 입력여부의 Alert */}
        {allNeededInfo === false ? (
          <Alert className="alertSignUp" variant="danger">
            The required fields were not completed.
          </Alert>
        ) : null}
      </Container>
    </article>
  );
}

export default SignUpForm;
