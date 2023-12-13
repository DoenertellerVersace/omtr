import WebSocket from 'ws';
import {WriteLock} from "./d";

export class CallbackClient {
  private _lock: null | WriteLock<any>;

  constructor() {
    this._lock = null;
    // instantiate client
  }

  public locked() : boolean {
    return this._lock !== null;
  }

  lock(lock: WriteLock<any>) {
    this._lock = lock;
  }
}

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to server');

  ws.send('Hello, server!');
});

ws.on('message', (message: string) => {
  console.log(`Received message from server: ${message}`);
});

ws.on('close', () => {
  console.log('Disconnected from server');
});