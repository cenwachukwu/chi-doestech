const mongoose = require("mongoose");

mongoose.Promise = Promise;

let mongoURI = "";
if (process.env.NODE_ENV === "production") {
  mongoURI = process.env.DB_URL;
} else {
  mongoURI = "mongodb://localhost/chidoestech";
}

JWT_KEY = WinterIsComingGOT2019;

jwtExp = "100d";

export const connect = () => {
  return mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(instance =>
      console.log(`Connected to db: ${instance.connections[0].name}`)
    )
    .catch(error => console.log("Connection failed!", error));
};
