import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import getMe from './middleware/getMe';
import api from "./dataSources/api";
import resolvers from './resolvers';
import schema from './schema';
import models from './models';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({
    api: new api()
  }),
  context: async ({ req }) => {

    const user = await getMe(req);

    return {
      models,
      me: user || null,
      secret: process.env.SECRET_KEY
    };
  }
});

(async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_STRING, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() => console.log("db connected"))
      .catch(err => console.error("ooh noo, error: ", err));

    const app = express();

    app.use(cors());

    app.use(helmet());

    app.use(morgan('dev'));

    app.use(bodyParser.json())
    
    app.options('*', cors())
    app.use(cors({
      origin: true,
      credentials: true
    }))

    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: false
    })

    const port = process.env.PORT || 8000

    app.listen(port, () =>
      console.log(`server is running on ${ port }`)
    );
  } catch (err) {
    console.log(`server failed: ${ err }`);
  }
})();