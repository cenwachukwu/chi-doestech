import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { connect } from "./config/connection";

export const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.set("port", process.env.PORT || 8080);

export const start = async () => {
  try {
    await connect();
    app.listen(app.get("port"), () => {
      console.log(`✅ PORT: ${app.get("port")} 🌟`);
    });
  } catch (e) {
    console.error(e);
  }
};
