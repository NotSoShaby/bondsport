# Refale's Interview for BondSport

# Prequisets: 

 - NPM  (https://www.npmjs.com/)
 - docker+docker-compose (https://docs.docker.com/compose/install/)
 - postman (optional - highly recommneded) - (https://www.postman.com/downloads/)

# To get up and running with the project:

clone the repo then run

`$ cd bondsport`
`$ npm i`
`$ docker-compose up -d`
`$ npm start`

server will run locally on port 3000 (if not taken by a different server).

Open postman and import the `bondsporn-pstman.postman_collection.json` file to it.
This file contains all the templates for calls to test the system as stated in the requierments pdf.

The templates will be on the right panel and are orginized and name properly so you can understand what they are doing. 
More functions are available (that don't have templates). 


# Technical Debt:

I created a few tests but they are not running well - I ran out of time. 
