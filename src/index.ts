import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
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