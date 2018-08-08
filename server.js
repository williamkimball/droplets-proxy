"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 6060;
app.set("port", port);
const request = require("request");
const apiUrl = "http://api.travelpayouts.com/v1";

// app.use(function(req, res, next) {
//   req.headers["X-Auth-Token"] = "7fe8a6850404e8611035f004e2a6bc3f";
//   req.pipe(request(apiUrl)).pipe(res);
//   next();
// });

// prices / cheap ? origin = MOW & destination=HKT & depart_date=2018 - 08 - 15 & return_date=2018 - 08 - 22 & token=7fe8a6850404e8611035f004e2a6bc3f & currency=usd
// MIDDLEWARE (transform stream)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log("yo");
  next();
});

app.get("/api/*", (req, res) => {
  let apiCall = req.url.slice("/api/".length);
  let apiReq = `${apiUrl}/${apiCall}`;
  let options = {
    method: "GET",
    url: apiReq,
    headers: {
      "X-Access-Token": "7fe8a6850404e8611035f004e2a6bc3f",
      "Access-Control-Allow-Headers": "X-Access-Token"
    }
  };
  //   apiReq.headers["X-Auth-Token"] = "7fe8a6850404e8611035f004e2a6bc3f";
  //   req.pipe(request(apiUrl)).pipe(res);
  request(options, (err, _, body) => {
    let json = JSON.parse(body);
    console.log(json);
    res.send(body);
  });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
