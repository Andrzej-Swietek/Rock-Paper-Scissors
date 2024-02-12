import {DB_DATABASE, DB_PORT} from "@config";

export const mongoConnection = {
  url: `mongodb://mongo:${DB_PORT}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
}
