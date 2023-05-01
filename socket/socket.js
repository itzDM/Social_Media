
import cors from "cors";
import { Server } from "socket.io";

const io = new Server({ cors: "http://localhost:3000" });

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId });
};
const disconnectUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("socket On");

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });


    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text
        });

    });


    socket.on("disconnect", () => {
        disconnectUser(socket.id);
        io.emit("getUsers", users);

    });

});

io.listen(4001);