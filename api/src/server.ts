import express from "express";
import cors from "cors";
import publicRoutes from "./routes/public";
import privateRoutes from "./routes/private";
import config from "./config";
const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
}));

app.use(express.urlencoded({ extended: true }));

// Routes
// Public Routes

app.use("/public", publicRoutes());

// Private Routes
app.use("/private", privateRoutes());

const PORT = config.api.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




