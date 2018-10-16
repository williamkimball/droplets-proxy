"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 6060;
app.set("port", port);
const request = require("request");
const apiUrl = "https://sandbox.plaid.com";
var bodyParser = require("body-parser");

app.use(bodyParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/*", (req, res) => {
  let apiCall = req.url.slice("/".length);
  let data = JSON.stringify(req.body);
  let apiReq = `${apiUrl}/${apiCall}`;
  let options = {
    method: "POST",
    url: apiReq,
    body: data,
    headers: {
      "Content-Type": "application/json"
    }
  };

  request(options, (err, _, body) => {
    let json = JSON.parse(body);
    res.send(body);
  });
});
app.listen(port, () => console.log(`Listening on port: ${port}`));
