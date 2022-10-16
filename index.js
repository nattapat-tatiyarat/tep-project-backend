const app = require("./app");
const { connectDB } = require("./configs/connect");

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log("PORT:", process.env.PORT.yellow);
});
