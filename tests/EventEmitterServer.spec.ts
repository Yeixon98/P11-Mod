import "mocha";
import { expect } from "chai";
import EventEmitterServer from '../src/server/EventEmitterServer'
import { EventEmitter } from "events";
import { Request } from "../src/types";

describe("Event Emitter Server", () => {
  it("Socket Server 1", () => {
    const socket = new EventEmitter();
    const server = new EventEmitterServer(socket);

    server.on('request', (req: Request) => {
      expect(req.command).to.eql("ls")
      expect(req.args).to.eql(["-la", "file.txt"])
      
    })

    socket.emit('data', '{"command": "ls",');
    socket.emit('data', '"args": ["-la", "file.txt"]}\n');

  });

  it("Socket Server 2", () => {
    const socket = new EventEmitter();
    const server = new EventEmitterServer(socket);

    server.on('request', (req: Request) => {
      expect(req.command).to.eql("cat")
      expect(req.args).to.eql(["README"])
      
    })

    socket.emit('data', '{"command": "cat",');
    socket.emit('data', '"args": ["README"]}\n');

  });

});