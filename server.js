require("dotenv").config(); 
const express = require("express"); 
const mongoose = require("mongoose"); 
const cors = require("cors"); 
const app = express(); 
const PORT = 3000; 
// Middleware 
app.use(express.json()); 
app.use(cors()); 
// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URI) 
 .then(() => console.log("MongoDB Connected")) 
 .catch(err => console.error(err)); 
// Routes 
app.use("/api/auth", require("./routes/auth")); 
app.use("/api/students", require("./routes/students")); 
// Start server 
app.listen(PORT, () => { 
 console.log(`Server running on http://localhost:${PORT}`); });
