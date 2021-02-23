// getting Web server object
const http = require("http");

// Business logic
const { getStatusByUrl } = require("./model/signIn");

// middlewares
const { bodyParser } = require("./middlewares/bodyParser");
const handleResponse = require("./middlewares/handleResponse");

const server = http
  .createServer(async (req, res) => {
    try {
      if (req.method === "POST") {
        if (req.url === "/signIn/user") {
          // ============= Sign in =============== //
          let body = bodyParser(req);
          let info = await body;
          const isInfoValid = await getStatusByUrl(info, req.url);

          switch (isInfoValid) {
            // Success to Sign-in
            case true:
              handleResponse.status200(res, isInfoValid);
              break;

            // fail to Sign-in
            case false:
              handleResponse.status200(res, isInfoValid);
              break;
          }
        } else if (req.url === "/isDuplicate/id") {
          // ============= 아이디 중복 검사 =============== //
          let body = bodyParser(req);
          let info = await body;
          const isInfoValid = await getStatusByUrl(info);
          console.log(isInfoValid);

          // db.query(sql, id, (err, result, fields) => {
          //   if (err) {
          //     res.write({
          //       success: false,
          //       message: "database error",
          //       error: err,
          //     });
          //     res.end();
          //     throw err;
          //   }

          //   // 중복된 아이디가 존재하는 경우
          //   if (result.length) {
          //     res.writeHead(200, {
          //       "Content-Type": "application/json; charset=utf-8",
          //     });
          //     res.write(JSON.stringify({ status: false }));
          //     return res.end();
          //   } else {
          //     res.writeHead(200, {
          //       "Content-Type": "application/json; charset=utf-8",
          //     });
          //     res.write(JSON.stringify({ status: true }));
          //     return res.end();
          //   }
          // });
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
      handleResponse.status200(err);
    }
  })
  .listen(5000);

server.on("listening", () => {
  console.log("5000번 포트에서 서버 대기 중입니다.");
});

server.on("error", (err) => {
  console.error(err);
});
