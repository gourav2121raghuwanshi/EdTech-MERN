const express = require('express')
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const database = require("./config/database");
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
)

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp",
	})
)

cloudinaryConnect();

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: 'Your server is up and runninggg....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
});