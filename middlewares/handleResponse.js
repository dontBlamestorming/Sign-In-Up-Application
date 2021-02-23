module.exports.status200 = function (res, status) {
  res.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.write(JSON.stringify({ status: status }));
  return res.end();
};

module.exports.status500 = function (err) {
  res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(err.messages);
};
