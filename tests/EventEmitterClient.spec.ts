import "mocha";
import { expect } from "chai";
import EventEmitterClient from '../src/client/EventEmitterClient'
import { EventEmitter } from "events";
import { Response } from "../src/types";

describe("Event Emitter Client", () => {
  it("Socket Client 1", () => {
    const socket = new EventEmitter();
    const client = new EventEmitterClient(socket);

    client.on('response', (res: Response) => {
      expect(res.status).to.eql('true')
      expect(res.message).to.eql("Response Command")
      
    })

    socket.emit('data', '{"status": "true",');
    socket.emit('data', '"message": "Response Command"}');
    socket.emit('end');
  });

  it("Socket Client 2", () => {
    const socket = new EventEmitter();
    const client = new EventEmitterClient(socket);

    client.on('response', (res: Response) => {
      expect(res.status).to.eql('false')
      expect(res.message).to.eql("Bad request")
      
    })

    socket.emit('data', '{"status": "false",');
    socket.emit('data', '"message": "Bad request"}');
    socket.emit('end');
  });
});