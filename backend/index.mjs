import express from 'express';
import UserViews from "./Views/Users/UserView.mjs";
const app = express();
const port = 3000;

// middleware for parsing json
app.use(express.json());

// connecting to database
import connectDB, {Postgres} from './DB/Postgres/Config/Config.mjs';
Postgres.client = connectDB();

app.use('/users', UserViews);

app.get('/', (req, res) => {
  res.send('Hello World!');
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 