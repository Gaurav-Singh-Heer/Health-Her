// controllers/logController.js
const Log = require("../models/Log");

const calendar = async (req, res) => {
  try {
    const pastCycles = await Log.find({ user: req.userID }).sort({ year: -1, month: -1 }).lean();
    res.render("calendar", { pastCycles });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

const logCycle = async (req, res) => {
  try {
    const { days, month, monthabbr, year } = req.body;
    await Log.create({ days, month, monthabbr, year, user: req.userID });
    res.redirect("/calendar");
  } catch (err) {
    console.error(err);
    res.redirect("/dashboard");
  }
};

const deleteLog = async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.redirect("/calendar");
  } catch (err) {
    console.error(err);
    res.redirect("/calendar");
  }
};

module.exports = { calendar, logCycle, deleteLog };