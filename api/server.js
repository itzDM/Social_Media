import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from 'multer';
import { db } from "./datBase.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import relationRoutes from "./routes/relationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";



const app = express();

dotenv.config();

// Middleware

app.use(express.json());


app.use(cors({
    origin: process.env.ORIGIN
}));




app.use(cookieParser());
db();

app.get("/", (req, res) => {
    res.send("Api Work Successfully");
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/post", postRoutes);
app.use("/api/relation", relationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);

app.listen(process.env.PORT || 5001, () => {
    console.log(`Server Is Running On Port ${process.env.PORT}`);
});


