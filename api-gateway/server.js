const express = require("express");
const proxy = require("express-http-proxy");
const app = express();

// Use service names for Docker networking, fallback to localhost for local dev
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || "http://localhost:4001";
const PATIENT_SERVICE = process.env.PATIENT_SERVICE_URL || "http://localhost:4002";
const DOCTOR_SERVICE = process.env.DOCTOR_SERVICE_URL || "http://localhost:4003";
const APPOINTMENT_SERVICE = process.env.APPOINTMENT_SERVICE_URL || "http://localhost:4004";

app.use("/auth", proxy(AUTH_SERVICE));
app.use("/users", proxy(PATIENT_SERVICE));
app.use("/doctors", proxy(DOCTOR_SERVICE));
app.use("/appointments", proxy(APPOINTMENT_SERVICE));

app.get("/health", (_, res) => res.send("Gateway OK"));

app.listen(4000, () => console.log("API Gateway on 4000"));
