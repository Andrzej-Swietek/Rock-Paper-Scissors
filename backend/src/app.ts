import express from 'express';
import {Socket} from "socket.io";
import {createServer, Server} from "http";
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import hpp from 'hpp';
import morgan from 'morgan';

// Types & Interfaces
import {Routes} from "@interfaces/routes.interface";

// Utils
import {logger, stream} from "@utils/logger";

// Middlewares
import errorMiddleware from "@middlewares/error.middleware";

// Envs
import {CREDENTIALS, NODE_ENV, ORIGIN, PORT, LOG_FORMAT} from "@config";

// Websocket Events
import {WebsocketServer, WebsocketServerBuilder} from "@websocket/websocket";
import {ConnectionEvent} from "@events/connection.event";
import {ChatEvent} from "@events/chat.event";
import {GameEvent} from "@events/game.event";

class App {
  public app: express.Application;
  public httpServer: Server;
  public env: string;
  public port: string | number;
  public websocketServer: WebsocketServer;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3030;
    this.httpServer = createServer(this.app);

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    // this.app.listen(this.port, () => {
    this.httpServer.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    // if (this.env !== 'production') {
    //   set('debug', true);
    // }
    // console.log('daad', dbConnection);
    // connect(dbConnection.url, dbConnection.options);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    console.log({ routes });
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  public setUpWebsocketServer(){
    ( async ()=> {
      this.websocketServer = await new WebsocketServerBuilder(this.httpServer)
        .withEvent({ name: 'chat', handler: ChatEvent.onMessage})
        .withEvents([
          { name: 'player-move', handler: GameEvent.handleMove },
          { name: 'leave-room', handler: GameEvent.leaveRoom },
          { name: 'game-over', handler: GameEvent.gameOver },
        ])
        // .withEvent({name: "end_game", handler: endGameHandler})
        .withRedisBroker()
        .build();
    })()
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
