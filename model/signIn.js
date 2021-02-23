// Database
const db = require("../dbConfig");

// init database
db.connect();

function queryToDatabase(string, keyword) {
  return new Promise((resolve, reject) => {
    db.query(string, keyword, (err, result) => {
      try {
        if (!result.length) {
          resolve(false);
        } else {
          resolve(true);
        }
      } catch (err) {
        throw err;
      }
    });
  });
}

async function checkInfoValidation(info) {
  let sql =
    "SELECT * FROM Authentication WHERE mem_email = (?) AND mem_password = (?)";
  const id = info.userId;
  const password = info.password;
  const params = [id, password];
  let status = await queryToDatabase(sql, params);

  return status;
}

module.exports = checkInfoValidation;

module.exports.getStatusByUrl = async function (info, url) {
  let status = null;
  const infoTable = {
    id: info.userId,
    password: info.password,
    year: Number(info.year),
    month: Number(info.month),
    day: Number(info.day),
    gender: info.gender,
  };
  const { id, password, year, month, day, gender } = infoTable;

  switch (url) {
    case "/signIn/user":
      console.log("SignInSignInSignInSignIn");
      let sql__signIn =
        "SELECT * FROM Authentication WHERE mem_email = (?) AND mem_password = (?)";
      const param__signIn = [id, password];
      status = await queryToDatabase(sql__signIn, param__signIn);
      break;

    case "/isDuplicate/id":
      console.log("중복체크중복체크중복체크중복체크");
      let sql__isSameId =
        "SELECT mem_email FROM Authentication where mem_email = (?)";
      status = await queryToDatabase(sql__isSameId, id);
      break;

    case "/post/user/signUp": // '/signUp/user'가 나은듯
      console.log("signUpsignUpsignUp");
      let sql_signUp =
        "INSERT INTO Authentication VALUES (null, ?, ?, ?, ?, ?, ?, now(), 0)";
      const param__signUp = [id, password, year, month, day, gender];
      status = await queryToDatabase(sql_signUp, param__signUp);
      break;
  }

  return status;
};
