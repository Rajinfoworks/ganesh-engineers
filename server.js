const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// ===== MongoDB Setup =====
// ✅ Make sure your .env has the database name in the URI:
// MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ganesh_engineers?retryWrites=true&w=majority
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB connected to ganesh_engineers"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ===== Contact Schema =====
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// ✅ Force collection name "contacts"
const Contact = mongoose.model("Contact", contactSchema, "contacts");

// ===== Nodemailer Transport =====
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,          // e.g., smtp.gmail.com
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ===== Contact Route =====
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Save to MongoDB
        const newMessage = new Contact({ name, email, message });
        await newMessage.save();
        console.log("💾 Message saved to MongoDB:", newMessage);

        // Send email notification
        const mailOptions = {
            from: `"Ganesh Engineers Website" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.error("❌ Email sending error:", err);
            else console.log("📧 Email sent:", info.response);
        });

        res.status(200).json({ success: "Message sent successfully" });
    } catch (err) {
        console.error("❌ Server error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ===== Default Route =====
app.get('/', (req, res) => {
    res.send('Ganesh Engineers API is running...');
});

// ===== Start Server =====
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
