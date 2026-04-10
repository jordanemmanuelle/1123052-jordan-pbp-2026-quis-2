import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
// @ts-ignore
import db from './models';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Server Berhasil Nyala!');
});

db.sequelize.authenticate()
  .then(() => {
    console.log('Koneksi database berhasil!');
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  })
  .catch((err: any) => {
    console.error('Koneksi database gagal:', err);
  });