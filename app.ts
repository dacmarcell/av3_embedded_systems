import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { TemperatureAnalyzer } from "./temperature/TemperatureAnalyzer";
import { VibrationAnalyzer } from "./temperature/VibrationAnalyzer";

const app = express();
const server = createServer(app);
const io = new Server(server);

type MessageTypes = "vibration" | "temperature";

type Message = {
  type: MessageTypes;
  value: string;
};

io.on("connection", (socket) => {
  console.log(`connected: ${socket.id}`);
  socket.on("message", (socket) => {
    const { type, value }: Message = JSON.parse(socket);

    switch (type) {
      case "temperature":
        const temperatureAnalyzer = new TemperatureAnalyzer();
        temperatureAnalyzer.execute();

        io.emit(type, "vibrou temp" + value);
        break;
      case "vibration":
        const vibrationAnalyzer = new VibrationAnalyzer();
        vibrationAnalyzer.execute();

        io.emit(type, "vibrou vib" + value);
        break;
      default:
        io.emit("errors", "Tipo de mensagem inválido");
    }
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
