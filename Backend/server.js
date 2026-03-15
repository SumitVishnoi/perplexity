import "dotenv/config";
import app from "./src/app.js";
import connectedDB from "./src/config/database.js";

connectedDB()
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });

app.listen(3000, () => {
  console.log("Server is runing on port 3000");
});
