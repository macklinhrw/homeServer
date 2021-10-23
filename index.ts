const { response } = require("express");
const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  axios
    .get("https://api.lifx.com/v1/lights/all", {})
    .then((obj) => {
      let str = "<h2>";
      obj.data.forEach((item) => {
        str += item["label"] + "<br>";
      });
      str += "</h2>";
      res.send(str);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/test", (req, res) => {
  axios
    .put("https://api.lifx.com/v1/lights/label:Lamp/state", {
      options: {
        headers: {
          Authorization:
            "Bearer c257ed4a74616dc8169df8380a4643ed0456d952722e6dc18cbb48235d3336c9",
        },
      },
      body: {
        power: "off",
      },
    })
    .then((lightRes) => {
      res.send(lightRes.data);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
