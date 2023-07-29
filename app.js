require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const linkArray = require(__dirname + "/data.js").youtubeArray();
const ourServicesData = require(__dirname + "/data.js").ourServiceDataArray();
const physiotherapyData = require(__dirname +
  "/data.js").physiotherapyDataArray();
const essentialsData = require(__dirname + "/data.js").essentialsDataArray();
const specialisedData = require(__dirname + "/data.js").specialisedDataArray();
const ailmentsData = require(__dirname + "/data.js").ailmentsDataArray();
const techniqueData = require(__dirname + "/data.js").techniqueDataArray();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose
  .connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.iufm9po.mongodb.net/we-care`
  )
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Mongoose Schema

const formSchemaforAppointemt = new mongoose.Schema({
  name: String,
  gender: String,
  mobile: Number,
  state: String,
  city: String,
  email: String,
});

const formAppointmentItems = mongoose.model(
  "Form-Appointment-Item",
  formSchemaforAppointemt
);

const formSchemaforCovid = new mongoose.Schema({
  name: String,
  phone: Number,
  location: String,
  email: String,
  message: String,
});

const formCovidItems = mongoose.model("Form-Covid-Items", formSchemaforCovid);

// Home page and form

app.get("/", (req, res) => {
  res.render("index.ejs", { linkArray: linkArray });
});

app.post("/", async (req, res) => {
  try {
    const formDetails = new formAppointmentItems({
      name: req.body.name,
      gender: req.body.gender,
      mobile: req.body.mobile,
      state: req.body.state,
      city: req.body.city,
      email: req.body.email,
    });
    await formDetails
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.redirect("/formError");
      });
  } catch (err) {
    console.log(err.message);
  }
});

// About page

app.get("/about", (req, res) => {
  res.render("partials/about");
});

// Card Pages

app.get("/our-services", (req, res) => {
  res.render("card", { dataGet: ourServicesData });
});

app.get("/physiotherapy", (req, res) => {
  res.render("card", { dataGet: physiotherapyData });
});

app.get("/essentials", (req, res) => {
  res.render("card", { dataGet: essentialsData });
});

app.get("/specialised%20treatments", (req, res) => {
  res.render("card", { dataGet: specialisedData });
});

app.get("/ailments", (req, res) => {
  res.render("card", { dataGet: ailmentsData });
});

app.get("/techniques", (req, res) => {
  res.render("card", { dataGet: techniqueData });
});

// Pages like Knee Pain and all

// Our Services
app.get("/basic%20physiotherapy", (req, res) => {
  res.render("partials/ourServices/basic-physiotherapy");
});

app.get("/advance%20physiotherapy", (req, res) => {
  res.render("partials/ourServices/advance-physiotherapy");
});

app.get("/occupational%20therapy", (req, res) => {
  res.render("partials/ourServices/occupational-physiotherapy");
});

app.get("/speech%20therapy", (req, res) => {
  res.render("partials/ourServices/speech-therapy");
});

app.get("/attendant", (req, res) => {
  res.render("partials/ourServices/attendant");
});

app.get("/nurse", (req, res) => {
  res.render("partials/ourServices/nurse");
});

app.get("/doctor%20visit", (req, res) => {
  res.render("partials/ourServices/doctor");
});

app.get("/neuro%20physiotherapy", (req, res) => {
  res.render("partials/ourServices/neuro");
});

app.get("/orthopedic%20physiotherapy", (req, res) => {
  res.render("partials/ourServices/orthopedic");
});

app.get("/sports%20physiotherapy", (req, res) => {
  res.render("partials/ourServices/sports");
});

app.get("/rehabilitation%20physiotherapy", (req, res) => {
  res.render("partials/ourServices/rehab");
});

//Ailment

app.get("/knee%20pain", (req, res) => {
  res.render("partials/ailments/knee");
});

app.get("/back%20pain", (req, res) => {
  res.render("partials/ailments/back");
});

app.get("/shoulder%20pain", (req, res) => {
  res.render("partials/ailments/shoulder");
});

app.get("/joint%20pain", (req, res) => {
  res.render("partials/ailments/joint");
});

app.get("/spine%20pain", (req, res) => {
  res.render("partials/ailments/spine");
});

app.get("/hip%20pain", (req, res) => {
  res.render("partials/ailments/hip");
});

// Technique

app.get("/laser%20therapy", (req, res) => {
  res.render("partials/techniques/laser");
});

app.get("/cupping", (req, res) => {
  res.render("partials/techniques/cupping");
});

app.get("/osteopathy", (req, res) => {
  res.render("partials/techniques/oespathy");
});

app.get("/chiro%20therapy", (req, res) => {
  res.render("partials/techniques/chiro");
});

//Form Error
app.get("/formError", (req, res) => {
  res.render("partials/formDecline/formDecline.ejs");
});
//Covid and its form

app.get("/covid", (req, res) => {
  res.render("covid");
});

app.post("/covid", async (req, res) => {
  try {
    const formDetails = new formCovidItems({
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      email: req.body.email,
      message: req.body.message,
    });
    await formDetails
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.redirect("/formError");
      });
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Is Running");
});
