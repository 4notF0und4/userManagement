import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRoute from './routes/userRouter.js'; // Bu hissə "users" üçün dəyişdirildi

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.use('/users', usersRoute); // Bu hissə "users" üçün dəyişdirildi

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
