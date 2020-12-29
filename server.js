// init database
const http = require("http");
const db = require("./dbConfig");
db.connect();

const server = http
  .createServer(async (req, res) => {
    try {
      // ============= Sign in =============== //
      if (req.method === "POST") {
        if (req.url === "/signIn/user") {
          let body = "";

          req.on("data", (data) => {
            // data -> by stream
            body += data;
          });

          req.on("end", () => {
            const info = JSON.parse(body);
            // ---------- parsed body assign to info ---------- //

            let sql =
              "SELECT mem_email FROM Authentication WHERE mem_email IN ((?))";
            const id = info.userId;
            const password = info.password;

            // 아이디 조회
            db.query(sql, id, (err, result) => {
              if (err) {
                res.write({
                  success: false,
                  message: "database error",
                  error: err,
                });
                res.end();
                throw err;
              }

              // 아이디가 없는 경우
              if (!result.length) {
                res.writeHead(200, {
                  "Content-Type": "application/json; charset=utf-8",
                });
                res.write(JSON.stringify({ status: false }));
                return res.end();
              }

              // 아이디가 있는 경우
              if (id === result[0].mem_email) {
                sql =
                  "SELECT mem_password FROM Authentication WHERE mem_password IN ((?))";

                // 비밀번호 조회
                db.query(sql, password, (err, result) => {
                  if (err) {
                    res.write({
                      success: false,
                      message: "database error",
                      error: err,
                    });
                    res.end();
                    throw err;
                  }

                  //비밀번호가 없는 경우
                  if (!result.length) {
                    res.writeHead(200, {
                      "Content-Type": "application/json; charset=utf-8",
                    });
                    res.write(JSON.stringify({ status: false }));
                    return res.end();
                  }

                  // 아이디와 비밀번호 모두 일치하는 경우
                  if (password === result[0].mem_password) {
                    res.writeHead(200, {
                      "Content-Type": "application/json; charset=utf-8",
                    });
                    res.write(JSON.stringify({ status: true }));
                    return res.end();
                  }
                });
              }
            });
          });
        } else if (req.url === "/isDuplicate/id") {
          // ============= 아이디 중복 검사 =============== //
          let body = "";

          req.on("data", (data) => {
            body += data;
          });

          req.on("end", () => {
            const info = JSON.parse(body);
            // ---------- parsed body assign to info ---------- //
            let sql =
              "SELECT mem_email FROM Authentication where mem_email = (?)";
            const id = info.userId;

            db.query(sql, id, (err, result, fields) => {
              if (err) {
                res.write({
                  success: false,
                  message: "database error",
                  error: err,
                });
                res.end();
                throw err;
              }

              // 중복된 아이디가 존재하는 경우
              if (result.length) {
                res.writeHead(200, {
                  "Content-Type": "application/json; charset=utf-8",
                });
                res.write(JSON.stringify({ status: false }));
                return res.end();
              } else {
                res.writeHead(200, {
                  "Content-Type": "application/json; charset=utf-8",
                });
                res.write(JSON.stringify({ status: true }));
                return res.end();
              }
            });
          });
        } else if (req.url === "/post/user/signUp") {
          // ============= Sign Up =============== //
          let body = "";

          req.on("data", (data) => {
            body += data;
          });

          req.on("end", () => {
            const info = JSON.parse(body);
            // ---------- parsed body assign to info ---------- //

            let sql =
              "INSERT INTO Authentication VALUES (null, ?, ?, ?, ?, ?, ?, now(), 0)";
            const id = info.userId;
            const password = info.password;
            const year = Number(info.year);
            const month = Number(info.month);
            const day = Number(info.day);
            const gender = info.gender;
            const params = [id, password, year, month, day, gender];

            db.query(sql, params, (err, result, fields) => {
              if (err) {
                res.write(
                  JSON.stringify({
                    success: false,
                    message: "database error",
                    error: err,
                  })
                );
                res.end();
                throw err;
              } else {
                // 성공적으로 회원가입이 된 경우
                res.writeHead(200, {
                  "Content-Type": "application/json; charset=utf-8",
                });
                res.write(JSON.stringify({ status: true }));
                return res.end();
              }
            });
          });
        }
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.messages);
    }
  })
  .listen(3000);

server.on("listening", () => {
  console.log("3000번 포트에서 서버 대기 중입니다.");
});

server.on("error", (err) => {
  console.error(err);
});
