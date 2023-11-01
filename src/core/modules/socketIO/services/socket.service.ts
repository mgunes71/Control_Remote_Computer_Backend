import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as SocketIO from "socket.io";
import { Server } from "http";

import { Subject } from "rxjs";

@Injectable()
export class SocketService {
  private static instance: SocketService = null;

  private io: SocketIO.Server;

  private connectHandler: Subject<SocketIO.Socket>;
  private disconnectHandler: Subject<SocketIO.Socket>;

  private sockets: { [key: string]: SocketIO.Socket };
  private events: { [key: string]: Subject<any> };

  constructor() {
  }

  static getInstance() {
    if (this.instance == null) {
      this.instance = new SocketService();
    }
    return this.instance;
  }

  get server() {
    return this.io;
  }

  get client() {
    return this.sockets;
  }

  createSocketServer(server: Server) {
    if (this.io) {
      throw new Error("SocketIO Initialized");
    }

    this.io = new SocketIO.Server(server, {
      transports: ["websocket", "polling"],
      cors: { origin: "*" }
    });

    this.io.sockets.setMaxListeners(0);

    this.events = {};
    this.sockets = {};

    console.log("socket server created");

    return this.io;
  }

  onConnect(): Subject<SocketIO.Socket> {
    if (!this.connectHandler) {
      this.connectHandler = new Subject();

      this.io.on("connection", async (socket: SocketIO.Socket) => {
        // Disable max listener limit
        socket.setMaxListeners(0);

        socket.on("disconnect", () => {
          this.sockets[socket.id].removeAllListeners();
          delete this.sockets[socket.id];
          // this.disconnectHandler.next(socket);
        });

        this.sockets[socket.id] = socket;

        this.connectHandler.next(socket);
      });
    }

    return this.connectHandler;
  }


  sendToRoom(room: string, key: string, value: any) {
    return this.io.to(room).emit(key, value);
  }

  broadcast(key: string, value: any) {
    /*Object.keys(this.sockets).forEach(socketId => {
      this.sockets[socketId].emit(key, value);
    });*/

    return this.io.emit(key, value);
  }

  send(key: string, value: any) {
    /*Object.keys(this.sockets).forEach(socketId => {
      this.sockets[socketId].emit(key, value);
    });*/

    return this.io.emit(key, value);
  }
}
