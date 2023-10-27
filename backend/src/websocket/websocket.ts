import { Server, Socket } from "socket.io";
import { WebsocketEvent } from "@interfaces/event.interface";
import { logger } from "@utils/logger";
import redis, { RedisClientType } from "redis";
import { createClient } from "redis";
import { createAdapter, RedisAdapter } from "socket.io-redis-adapter";
import * as http from "http";

interface WebsocketServerFacade {
  addEvent(event: WebsocketEvent): WebsocketServerFacade;
  addEvents(events: WebsocketEvent[]): WebsocketServerFacade;
  addRedisBroker(redisUrl?: string): Promise<WebsocketServerFacade>;
}

export class WebsocketServer implements WebsocketServerFacade {
  private io: Server;
  private events: WebsocketEvent[] = [];

  public connectedUsers: Set<Socket> = new Set();

  constructor(httpServer: http.Server) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    this.io.on("connection", (socket: Socket) => {
      logger.info(`Connected user ${socket.id}`);

      // Join user to the lobby room
      socket.join("lobby");

      // Add the connected user to the set
      this.connectedUsers.add(socket);

      // Check if there are two users in the lobby
      if (this.connectedUsers.size === 2) {
        // Create a new room for the game
        const roomName = `game-${Math.floor(Math.random() * 1000)}`;

        // Move the users to the new room
        this.connectedUsers.forEach((userSocket) => {
          userSocket.leave("lobby");
          userSocket.join(roomName);
        });

        // Emit a "start-game" event to the new room
        this.io.to(roomName).emit("start-game");

        // Clear the connected users set
        this.connectedUsers.clear();
      }


      socket.emit("connected", { clientId: socket.id, message: 'success :)' });

      // Setting up listener for all events
      for (let event of this.events) {
        socket.on(event.name, (data: any) => event.handler(socket, data));
      }

      socket.on("disconnect", () => {
        // Remove the disconnected user from the set
        this.connectedUsers.delete(socket);
      });
    });
  }

  public addEvent(event: WebsocketEvent): WebsocketServer {
    this.events.push(event);
    return this;
  }

  public addEvents(events: WebsocketEvent[]): WebsocketServer {
    this.events.push(...events);
    return this;
  }

  public async addRedisBroker(redisUrl: string = "redis:6379"): Promise<WebsocketServer> {
    // const pubClient = createClient({ url: `redis://${redisUrl}` });
    // const subClient = pubClient.duplicate();

    // Promise.all([pubClient.connect(), subClient.connect()])
    //  .then( ()=> {
    //    this.io.adapter(createAdapter(pubClient as RedisAdapter, subClient as RedisAdapter));
    //  })
    //  .catch( (e)=> logger.info(`REDIS ERROR : ${ e }`))
    // @ts-ignore
    // this.io.adapter( createAdapter(pubClient, subClient) )
    return this;
  }
}

export class WebsocketServerBuilder {
  private port: number;
  private events: WebsocketEvent[];
  private redisUrl: string;
  private httpServer: http.Server;

  constructor(httpServer: http.Server) {
    // this.port = port;
    this.httpServer = httpServer;
    this.events = [];
    this.redisUrl = "redis:6379";
  }

  public withEvent(event: WebsocketEvent): WebsocketServerBuilder {
    this.events.push(event);
    return this;
  }

  public withEvents(events: WebsocketEvent[]): WebsocketServerBuilder {
    this.events.push(...events);
    return this;
  }

  public withRedisBroker(redisUrl: string = "redis:6379"): WebsocketServerBuilder {
    this.redisUrl = redisUrl;
    return this;
  }

  public build(): Promise<WebsocketServer> {
    const server = new WebsocketServer(this.httpServer);
    return server.addEvents(this.events).addRedisBroker(this.redisUrl);
  }
}


