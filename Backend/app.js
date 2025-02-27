const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const AuthRoutes = require("./routes/AuthRoutes/userRoues");
const UserRoutes = require("./routes/UserRoutes/userRoutes");

// const AuthCoRoutes = require("./routes/ParcelCoRoutes/parcelAuths");
// const ParcelRoutes = require("./routes/ParcelCoRoutes/parcelComRoutes");

app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/Auth", AuthRoutes);
app.use("/api/User", UserRoutes);
// app.use("/api/Co/Auth", AuthCoRoutes);
// app.use("/api/Co", ParcelRoutes);

const port = 8000 || process.env.PORT;
const StartConnection = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on ${port}`));
  } catch (error) {
    console.log("Unable to start the connection");
  }
};
StartConnection();
