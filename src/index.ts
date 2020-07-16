import express from 'express';

import { invokeCallback } from './controller';

const app = express();
const port = 3088;
app.use(express.json({ limit: "50mb" }));

app.post('/', invokeCallback);

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening on PORT:${port} 🚀`);
});