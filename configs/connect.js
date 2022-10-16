const mongoose = require("mongoose");
require("dotenv").config();

const MONGOOSE_URL = `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASS}@${process.env.MONGOOSE_ADDRESS}/${process.env.MONGOOSE_DB}`;

module.exports = {
  connectDB: async () => {
    try {
      const mongooseConnect = await mongoose.connect(MONGOOSE_URL);
      console.log(`Successfully connect to DB at ${MONGOOSE_URL.green}`);
    } catch (err) {
      console.log("====== Error connectDB ======");
      console.log(err);
    }
  },
};
