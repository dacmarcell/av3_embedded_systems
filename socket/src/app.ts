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

  socket.on("message", async (socket) => {
    const { type, value }: Message = JSON.parse(socket);

    if (type === "temperature") {
      const temperatureAnalyzer = new TemperatureAnalyzer();

      const valueToFloat = parseFloat(value);
      if (isNaN(valueToFloat)) {
        io.emit("errors", "Valor inválido. O valor deve ser um número");
        return;
      }

      await temperatureAnalyzer.addValue(valueToFloat);
      const { state } = await temperatureAnalyzer.execute();

      io.emit(type, state);
      return;
    }

    if (type === "vibration") {
      const vibrationAnalyzer = new VibrationAnalyzer();

      const valueToFloat = parseFloat(value);
      if (isNaN(valueToFloat)) {
        io.emit("errors", "Valor inválido. O valor deve ser um número");
        return;
      }

      await vibrationAnalyzer.addValue(valueToFloat);
      const { state } = await vibrationAnalyzer.execute();

      io.emit(type, state);
      return;
    }

    io.emit("errors", "Tipo de mensagem inválido");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
