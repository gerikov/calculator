import { StatusCodes } from 'http-status-codes';
import fs from 'fs';

const addValue = (req, res) => {
  try {
    const { valueToSave } = req.body;
    console.log(valueToSave);
    fs.writeFile('memory.txt', valueToSave.toString(), (err) => {
      if (err) {
        console.error(err);
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: 'Something went wrong' });
      }

      console.log(`The ${valueToSave} saved into the memory`);
    });
    res
      .status(StatusCodes.CREATED)
      .json({ msg: 'Number is saved to the memory' });
  } catch (error) {
    console.error(error);
  }
};

const readValue = (req, res) => {
  fs.readFile('memory.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' });
    }

    const value = parseInt(data.trim());
    res.status(StatusCodes.OK).json({ value });
  });
};

export { addValue, readValue };
