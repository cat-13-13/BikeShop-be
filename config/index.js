const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

const allowedOrigins = [
  "https://markus-bikes-shop.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173"
];

module.exports = (app) => {
  app.set("trust proxy", 1);
  

    app.use(cors({
        origin: function (origin, callback) {
            console.log("🌐 CORS origin:", origin);
            // Permitir peticiones sin origin (como las de curl o postman)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log("🔒 Bloqueado por CORS:", origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    }));


    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
};
