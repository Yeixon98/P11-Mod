import * as net from "net";
import {spawn} from 'child_process';
import { Request, Response } from "../types";
import EventEmitterServer from "./EventEmitterServer";

/**
 * Clase que representa el servidor en la conecion
 */
export default class Server {
  constructor(private readonly port: number) {}

  /**
   * Da comienzo a la escucha del servidor
   */
  start = () => {
    const server = net.createServer((connection) => {
      const emitter = new EventEmitterServer(connection);

      emitter.on("request", (request: Request) => {
        console.log("User connect");
        
        let response: Response = {
          status: false,
          message: "",
        };

        const command = spawn(request.command, request.args)

        let commandOutput = '';
        command.stdout.on('data', (piece) => {
          commandOutput += piece;
        });

        command.stderr.on('data', () => {
          response = {
            status: false,
            message: "Bad Request"
          }
        });

        command.on('close', () => {
          response = {
            status: response.message === "" ? true : false,
            message: response.message === "" ? commandOutput : response.message
          }

          connection.write(JSON.stringify(response), (err) => {
            if (err) console.log("Fail to send response");
            connection.end();
          });
        });

        connection.on("close", () => {
          console.log("User disconnect\n");
        });
      });
    });

    server.listen(this.port, () => {
      console.log("\nServer is running\n");
    });
  };
}