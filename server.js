const io = require("socket.io")(3000, { cors: { origin: "*" } });

const players = new Map();

console.log("SERWER ZOSTAŁ URUCHOMIONY NA PORCIE 3000");

io.on("connection", (socket) => {
    console.log("Połączono ID: " + socket.id);

    if (players.has(socket.id)) {
        socket.emit("playerData", players.get(socket.id));
    } else {
        const PlayerData = {
            id: socket.id,
            x: 0,
            y: 0,
            z: 0
        }
        players.set(socket.id, PlayerData);
        socket.emit("playerData", players.get(socket.id));
    };

    socket.on("playerMove", (data) => {
        console.log(data);
    });

    socket.on("chatMessage", (data) => {
        console.log(data);
    });

    socket.on("disconnect", () => {
        console.log("Rozłączono ID: " + socket.id);
        players.delete(socket.id);
    });
});