const router = require("express").Router();
const verify = require("./verifyToken");
const Influx = require("influx");

const influx = new Influx.InfluxDB({
  //Should put in .env
  host: "localhost",
  database: "tagdb2",
  // username: "username",
  // password: "password",
  port: 8086
});

router.get("/", verify, (req, res) => {
  influx
    .query(
      "select mean(*) from sensors where time > now() - 12h group by location, time(1h) fill(none)"
    )
    .then(results => {
      res.json(results);
    })
    .catch(console.error);
});

module.exports = router;
