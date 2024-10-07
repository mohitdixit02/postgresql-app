import express from 'express';
import routes from "./routes/index.mjs";
const app = express();
const port = 3000;

// middleware for parsing json
app.use(express.json());

// connecting to database
import connectDB, {Postgres} from './DB/Postgres/Config/Config.mjs';
Postgres.client = connectDB();

// routes
app.use('/', routes);

// starting server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 