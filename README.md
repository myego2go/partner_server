# **Partner_Server**
A basic partner server structure. This project contributes on building a partner server for interacting mainly with MyEgo API's. The project fundamental goal is to give a kick start to the partners for improving their server and fetch the contracts from the Myego server and as well decrypt the contract with their own private key.

## **Installation**

* All the codes required to get started
* Packages to be installed 
* Environment files to be set
* Private Key to be stored under ***private_key.ego*** name

## **Clone**

* Clone this repo to your local machine using ```https://github.com/myego2go/partner_server.git```

## **Setup**

* Install all the packages using the below command:
```
$ npm install
```
* Download the **private_key** on signing up and store it under the repo as ***private_key.ego***
* Setup the environment file (.env) with **PARTNER_ID** and **API_KEY**
  * **PARTNER_ID** will be provided by Myego customer support
  * **API_Key** can be fetched by generating it on partner portal
```
EGO_API = https://api-partner.myego2go-staging.com/';
PARTNER_ID=''; 
API_KEY='';
```
* A callbackURL is to be set on your portal to receive client's information such as **user_id** and **contract_id**
  
## **Run**

* After completing the above setup, you can start the server by running the below command:
```
$ npm start
```




