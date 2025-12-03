const express = require("express");
const path = require("path");
const { generateTimetable, loadTimetable, saveTimetable } = require("./src/services/timetableGenerator");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Set views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// HOME PAGE (show timetable)
app.get("/", (req, res) => {
    const timetable = loadTimetable() || {};
    res.render("index", { timetable });
});

// GENERATE NEW TIMETABLE
app.get("/generate", (req, res) => {
    const timetable = generateTimetable();
    res.redirect("/");
});

app.post("/save", (req, res) => {
    const updated = req.body;
    saveTimetable(updated);
    res.redirect("/");
});

// START SERVER
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
