if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const port = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const compression = require("compression");
const { connectDB } = require("./config/db");
const authRouter = require('./routes/auth.routes.js');
const profileRouter = require('./routes/profile.routes.js');
const incomeRouter = require('./routes/income.routes.js');
const expenseRouter = require('./routes/expense.routes.js');
const dashboardRouter = require('./routes/dashboard.routes.js');
const aiRouter = require('./routes/ai.routes.js');

const app = express();

// Middleware to handle CORS
const corsOptions = {
    origin: 
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
}

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

connectDB();

app.use("/api/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/profile", profileRouter);
app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);
app.use("/ai", aiRouter);

// Health check route (important for Render)
app.get("/", (req, res) => {
  res.send("SpendMate API is running...");
});

app.listen(port, () => console.log(`Server listening on port ${port}`));