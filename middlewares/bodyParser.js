// ======== Error handleing need =========== //

exports.bodyParser = function (req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req
      .on("data", (data) => {
        body += data;
      })
      .on("end", () => {
        const parsedInfo = JSON.parse(body);
        resolve(parsedInfo);
      });
  });
};
