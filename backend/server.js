const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoute");
const messageRoutes = require("./routes/messageRoute");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const cors = require("cors");
dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: ["https://chat-application-kappa-one.vercel.app/"],

    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("APi is Rinning on the server");
});

// app.use("/api/user", userRoutes);

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });
// app.get("/api/chat/:id", (req, res) => {
//   const { params } = req;
//   const data = chats.find((fillId) => fillId._id === params.id);
//   return res.status(200).json({ data: data });
// });

const PORT = process.env.PORT;

const server = app.listen(PORT || 5000);

const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    origin: "https://chat-application-kappa-one.vercel.app/",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat) return;

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
