const express = require("express");
const db = require("./pkg/db/index");
const kurs = require("./handlers/kursHandler");
const akademija = require("./handlers/akademijaHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

db.init();

app.post("/kurs", kurs.createKurs);
app.get("/kurs", kurs.getKurs);
app.get("/kurs/:id", kurs.getOneKurs);
app.patch("/kurs", kurs.updateKurs);
app.delete("/kurs", kurs.deleteKurs);

app.post("/akademija", akademija.createAkademija);
app.get("/akademija", akademija.getAkademija);
app.get("/akademija/:id", akademija.getOneAkademija);
app.patch("/akademija", akademija.updateAkademija);
app.delete("/akademija", akademija.updateAkademija);

app.get("/test", (req, res) => {
  return res.render("test", { message: "Тест за backend развој на софтвер" });
});

app.get("/kurs", (req, res) => {
  return res.render("kurs");
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("I have a problem :D");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});
