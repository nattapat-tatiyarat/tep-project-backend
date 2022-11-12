const app = require("./app");
const { connectDB } = require("./configs/connect");

const PORT = process.env.PORT || 3405;
app.listen(PORT, async () => {
  await connectDB();
  console.log("PORT:", PORT.yellow);
});
