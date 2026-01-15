require("dotenv").config();

const port = process.env.PORT;

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
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
    origin: [/localhost:\d+$/],
    methods: [ "GET", "POST", "PUT", "DELETE" ],
    credentials: true,
}

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

app.listen(port, () => console.log(`Server listening on port ${port}`));