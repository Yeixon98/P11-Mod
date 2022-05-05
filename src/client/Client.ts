import * as net from "net";
import { Request, Response } from "../types";
const chalk = require("chalk");

import EventEmitterClient from "./EventEmitterClient";

/**
 * Clase que representa el cliente en la conecion
 */
export default class Client {
  constructor(private readonly port: number) {}

  /**
   * Da comienzo a la peticion
   * @param request Peticion que se relaizara al servidor
   */
  start = (request: Request) => {
    const client = net.connect({ port: this.port });

    const emitter = new EventEmitterClient(client);

    emitter.on("response", (res: Response) => {
      res.status ? (
        console.log(chalk.green(res.message))
      ) : (
        console.log(chalk.red(res.message))
      )
    });

    client.write(JSON.stringify(request) + "\n", (err) => {
      if (err) {
        console.log("Fail to send request");
      }
    });
  };
}