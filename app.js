const express = require("express");
const db = require("./pkg/db/index");
const kurs = require("./handlers/kursHandler");
const akademija = require("./handlers/akademijaHandler");
const ejs = require("./handlers/ejsHandler");
const user = require("./handlers/usersHandler");
const jwt = require("express-jwt");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

db.init();

app.get("/kurs", kurs.getKurs);
app.get("/akademija", akademija.getAkademija);

app.use(
  jwt
    .expressjwt({
      algorithms: ["HS256"],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null;
      },
    })
    .unless({
      path: ["/register", "/login", "/logout"],
    })
);

app.post("/kurs", kurs.createKurs);
app.get("/kurs/:id", kurs.getOneKurs);
app.patch("/kurs", kurs.updateKurs);
app.delete("/kurs", kurs.deleteKurs);

app.post("/akademija", akademija.createAkademija);
app.get("/akademija/:id", akademija.getOneAkademija);
app.patch("/akademija", akademija.updateAkademija);
app.delete("/akademija", akademija.updateAkademija);

app.get("/test", ejs.test);
app.get("/welcome", ejs.database);

app.post("/register", user.register);
app.post("/login", user.login);
app.post("/logout", user.logout);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("I have a problem :D");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});
