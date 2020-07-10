import { Request, Response, NextFunction } from 'express';
import get from 'request-promise';

const api_url = process.env.EGO_API;
const partner_id = process.env.PARTNER_ID;
const api_key = process.env.API_KEY;

const invokeCallback = (req: Request, res: Response, next: NextFunction) => {
  console.log('POST: Callback URL has been contacted');
  console.log('request:', req);
  console.log('body:', req.body);
  console.log('env', process.env)
  /* STEP: send OK on receipt of "user_id", "contract_id" */
  const { user_id, contract_id } = req.body;
  if (user_id && contract_id) res.status(200).send();
  else return res.status(500).send();
  
  /* STEP: destructure relevant variables from req.body and use them to retrieve the contract data */
  const options = {
    uri: `${api_url}/partner/api/${partner_id}/${user_id}/contracts/${contract_id}`,
    headers: {
      'x-myego2go-partner-api-key': api_key
    },
    json: true
  };

  /* STEP: call read contract endpoint from myEGO2GO API */
  get(options)
    .then((res: Response) => {
      console.log('API: response received. Processing...');
      console.log(res);
    })
    .catch((err: Error) => {
      console.log(`ERROR: ${err.message}`);
    });
    
    res.send();
};

export {
  invokeCallback
};