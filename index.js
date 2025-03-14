const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 9000;
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const path = require('path');

const server = http.createServer(app);

// ✅ Socket.io ko HTTPS pe chalane ka code
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-5-fhsa.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"]
  },
});

require("./DataBase/db.js");
app.use(express.json());
app.use(cookieParser());

// ✅ Socket.io Event Listen
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinConversation", (conversationId) => {
    console.log(`User Joined Conversation Id Of ${conversationId}`);
    socket.join(conversationId);
  });

  socket.on("sendMessage", (convId, messageDetail) => {
    console.log("message sent");
    io.to(convId).emit("receiveMessage", messageDetail);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(
  cors({
    credentials: true,
    origin: "https://chat-app-5-fhsa.onrender.com",
  })
);

const UserRoutes = require("./Routes/userRoute.js");
const ConversationRoute = require("./Routes/conversation.js");
const MessageRoutes = require("./Routes/message.js");

app.use("/api/auth", UserRoutes);
app.use("/api/conversation", ConversationRoute);
app.use("/api/chat", MessageRoutes);

// ✅ Static Files Serve
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})

// ✅ Port Listen
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
