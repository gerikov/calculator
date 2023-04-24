import { StatusCodes } from 'http-status-codes';
import fs from 'fs';

const addValue = async (req, res) => {
  try {
    const { valueToSave } = req.body;
    await fs.writeFile('memory.txt', valueToSave.toString(), (err) => {
      if (err) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: 'Something went wrong' });
      }
    });
    res
      .status(StatusCodes.CREATED)
      .json({ msg: 'Number is saved to the memory' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' });
  }
};

const readValue = async (req, res) => {
  await fs.readFile('memory.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' });
    }

    const value = parseInt(data.trim());
    res.status(StatusCodes.OK).json({ value });
  });
};

export { addValue, readValue };
