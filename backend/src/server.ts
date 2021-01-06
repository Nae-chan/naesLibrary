/**
 * Create a server for the API.
 */
import "dotenv/config";
import { app } from "./app";
import * as http from "http";
import mongoose from "mongoose";

const server = http.createServer(app);

server.listen(process.env.PORT);
server.on("listening", async () => {
  console.info(`Server Activated!! Listening on port ${process.env.PORT}`);
  console.info("Attempting to connect to db...");

  // set up mongodb connection
  mongoose.connect(process.env.DBSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const dbClient = mongoose.connection;

  dbClient.on("error", (error) =>
    console.error("Unable to connect: /n,", error)
  );
  dbClient.once("open", () =>
    console.info("Connected to Database Successfully")
  );
});
