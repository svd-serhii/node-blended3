const dotenv = require("dotenv");
dotenv.config();

const { connectDB } = require("./db/connectDB");

const app = require("./app");

const { PORT, DB_URI } = process.env;

//IIFE
(async () => {
  try {
    await connectDB(DB_URI);
    console.log("Connected to database successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
