const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require('./routes')

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to db');
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

app.use(userRouter)
run();