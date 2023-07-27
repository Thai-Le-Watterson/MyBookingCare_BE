import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/initWebRoutes";
import dotenv from "dotenv";
import connectDB from "./services/connectDB";
import cors from "cors";

dotenv.config();

const app = express();

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

configViewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Running in port: ", port);
});
