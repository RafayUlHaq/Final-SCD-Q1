const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:4005";

let appointments = [];
app.post("/appointments", async (req, res) => {
  const { userId, doctorId, date } = req.body;
  appointments.push({ userId, doctorId, date });
  try {
    await axios.post(`${NOTIFICATION_SERVICE}/notify`, {
      message: `Appointment Booked for user ${userId} with doctor ${doctorId} on ${date}`
    });
  } catch (err) {
    console.log("Notification service unavailable:", err.message);
  }

  res.json({ message: "Appointment confirmed" });
});

app.get("/appointments", (req, res) => {
  res.json(appointments);
});

app.delete("/appointments/:id", (req, res) => {
  appointments.splice(req.params.id, 1);
  res.json({ message: "Appointment cancelled" });
});

app.get("/health", (_, res) => res.send("Appointment OK"));
app.listen(4004, () => console.log("Appointment Service on 4004"));
