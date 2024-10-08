import express from 'express';
import routes from "./routes/index.mjs";
import cors from 'cors';
const app = express();
const port = 5000;

// middleware for parsing json
app.use(express.json());

// cors
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// connecting to database
import connectDB, {Postgres} from './DB/Postgres/Config/Config.mjs';
Postgres.client = connectDB();

// routes
app.use('/', routes);

// starting server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 