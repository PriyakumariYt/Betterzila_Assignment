require("dotenv").config();
const express = require('express');
const cors = require("cors");
const connectDb = require("./utils/db");
const port = process.env.PORT || 5000;
const authRoute = require("./Router/auth-router");



// Middleware

const app = express();
const corsOptions = {
    // origin: "http://localhost:5173",
    origin:"https://betterzila-assignment.vercel.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth",authRoute)




connectDb().then(()=>{
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});

