import mongoDB from "./controllers/database";
import app from "./index";

// default port
const PORT = 5000;
mongoDB.connect();

app.listen(PORT, () => {
  console.log(`started server: http://localhost:${PORT}`);
});
