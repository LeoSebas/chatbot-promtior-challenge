import cors from "cors";
import express from "express";
import config from "./config";
import privateRoutes from "./routes/private";
import publicRoutes from "./routes/public";
const app = express();

app.use(express.json());

app.use(cors({
  origin: config.frontend.host,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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




