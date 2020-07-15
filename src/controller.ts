import { Request, Response, NextFunction } from 'express';
import get from 'request-promise';

const api_url = process.env.EGO_API;
const partner_id = process.env.PARTNER_ID;
const api_key = process.env.API_KEY;

const invokeCallback = (req: Request, res: Response, next: NextFunction) => {
  console.log('POST: Callback URL has been contacted');
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

/*
{
  status: 0,
  message: 'read_contract_success',
  _data: {
    clientId: '0fb78c06-618d-5ec9-be44-af89547c4796',
    contractId: 'b0874a60-c5cf-11ea-8832-e5a0f791b2fc',
    contract_version: 'x3o9iRsBBUcB92pn01UO_bazi67o7itC',
    createDate: '2020-07-14T12:43:57.290Z',
    partnerId: '3b1acc60-baf4-11ea-be50-cf2f41ea71f9',
    payload: {
      partner_id: '3b1acc60-baf4-11ea-be50-cf2f41ea71f9',
      template_id: '0a3330e0-bf74-11ea-8da0-4b0fb5eb875c',
      payload: [Object],
      contractId: 'b0874a60-c5cf-11ea-8832-e5a0f791b2fc'
    },
    templateId: '0a3330e0-bf74-11ea-8da0-4b0fb5eb875c',
    updateDate: '2020-07-14T12:43:57.290Z'
  }
}

*/