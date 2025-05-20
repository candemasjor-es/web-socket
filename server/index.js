import { Server } from "socket.io";

const io = new Server(3000, { 
    cors: {
        origin: "*"
    } 
});

const users = new Map();

io.on("connection", (socket) => {
    console.log("Nueva conexión:", socket.id);

    socket.on("set-username", (username) => {
        users.set(socket.id, { username });
        console.log("Usuarios conectados:", Array.from(users.values()));
    });

    socket.on("mensaje", (mensaje) => {
        const userData = users.get(socket.id);
        if (userData) {
            io.emit("respuesta", {
                username: userData.username,
                text: mensaje,
                timestamp: new Date().toISOString()
            });
        }
    });

    socket.on("disconnect", () => {
        users.delete(socket.id);
        console.log("Usuario desconectado:", socket.id);
    });
});
