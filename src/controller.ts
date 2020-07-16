import { Request, Response, NextFunction } from 'express';
import get from 'request-promise';
import fs from 'fs';
import crypto from 'crypto';

const api_url = process.env.EGO_API;
const partner_id = process.env.PARTNER_ID;
const api_key = process.env.API_KEY;

const algorithm = 'aes-256-cbc';

/* STEP 1: Read Private Key from file saved locally */
const _privateKey = fs.readFileSync('private_key.ego', 'utf8');

/* Private method for decrypting a specific contract */
const _decryptPayload = ({ encryptedContract, encryptedAESKeyPartner, _privateKey }) => {
  try {
    const decryptedKey = crypto.privateDecrypt(_privateKey, Buffer.from(encryptedAESKeyPartner, "base64")).toString('utf8');
    const [iv, encryptedText] = encryptedContract.split(':').map(part => Buffer.from(part, 'hex'));
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(decryptedKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString());
  } catch (err) {
    console.log('Decryption Error:', err.message);
  }
};

/* receive contract_id and user_id and also decrypt Contract*/ 
const invokeCallback = (req: Request, res: Response, next: NextFunction) => {

  console.log('POST: Callback URL has been contacted');
  /* STEP 2: send OK on receipt of "user_id", "contract_id" */
  const { user_id, contract_id } = req.body;
  if (user_id && contract_id) res.status(200).send();
  else return res.status(500).send();
  
  /* STEP 3: destructure relevant variables from req.body and use them to retrieve the contract data */
  const options = {
    uri: `${api_url}/partner/api/${partner_id}/${user_id}/contracts/${contract_id}`,
    headers: {
      'x-myego2go-partner-api-key': api_key
    },
    json: true
  };

  /* STEP 4: call read contract endpoint from myEGO2GO API */
  get(options)
    .then((res: Response) => {
      console.log('API: response received. Processing...');
      return res;
    })

    /* STEP 5: Exrtract encrypted payload from the response*/
    .then(({_data}) => {
      return _data.payload.payload;
    })

    /* STEP 6: Decrypt the Contract */
    .then(({ encryptedContract, encryptedAESKeyPartner }) =>{
      return _decryptPayload({ encryptedContract, encryptedAESKeyPartner, _privateKey });
    })

    /* STEP 7: receives decrypted contract */
    .then((data) => {
      /* This data can be used to connect database etc.. */
      console.log("data:",data);  
    })
    .catch((err: Error) => {
      console.log(`ERROR: ${err.message}`);
    }); 
};

export {
  invokeCallback
};