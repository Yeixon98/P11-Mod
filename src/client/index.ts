import { Request } from "../types";
import Client from "./Client";

const client = new Client(5001)

if (process.argv.length < 3) {
  console.log("Indique un comando");
} else {
  const cmd = process.argv[2];
  process.argv.splice(0, 3)

  const request: Request = {
    command: cmd,
    args: process.argv
  }

  client.start(request)
}