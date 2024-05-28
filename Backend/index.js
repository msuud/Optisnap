const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
const userRoutes = require("./routes/user.routes");
const picRoutes = require("./routes/pics.routes");
const verifyRoutes = require("./routes/verify.routes");
const cors = require("cors");
const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(userRoutes);
app.use("/pic", picRoutes);
app.use("/verify", verifyRoutes);
run();
