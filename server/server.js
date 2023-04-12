import express from 'express';
import memoryRoute from './routes/memoryRouter.js';
const app = express();

app.use(express.json());

app.use('/api/v1/memory', memoryRoute);

const port = process.env.PORT || 4000;

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
