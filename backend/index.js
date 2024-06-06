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
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

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

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);


app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: 'Your server is up and runninggg....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
});