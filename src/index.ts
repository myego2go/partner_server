import express from 'express';
import dotenv from 'dotenv';

import { invokeCallback } from './controller';

dotenv.config();

const app = express();
const port = 3088;

app.post('/routes', (req, res, next) => console.log(req.body, req.headers, res));

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening on PORT:${port} 🚀`);
});

/* 
TODO:
0. set up .env (PARTNER_ID, API_KEY)
1. Callback endpoint (user_id, contract_id)
2. Read contract (incl. api_key)
3. decrypt the contract (using private key)
*/