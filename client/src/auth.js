import axios from "axios";

// sign in 요청
export const signIn = (email, password, getStatus) => {
  axios
    .post("/signIn/user", {
      userId: email,
      password: password,
    })
    .then((res) => {
      getStatus(res.data.status);
    });
};

// 중복검사 요청
export const doesIdDuplicate = (id, getStatus) => {
  axios
    .post("/isDuplicate/id", {
      userId: id,
    })
    .then((res) => {
      getStatus(res.data.status);
    });
};

// sign up 요청
export const signUp = (values, getStatus) => {
  const { email, password, gender, yy, mm, dd } = values;

  axios
    .post("/post/user/signUp", {
      userId: email,
      password: password,
      gender: gender,
      year: yy,
      month: mm,
      day: dd,
    })
    .then((res) => {
      getStatus(res.data.status);
    });
};
