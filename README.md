
# Project-Kedy

Project Kedy,  An Instagram Bot Automatically Shares Random Cat Images

  
## How To Get Cat Api Key
1. Go to ``https://thecatapi.com/signup`` website
2. Sign up (Completely free)
3. Select free plan
4. Copy the key
## How To Create Configuration File
1. Create an empty file and name as ``config.js``
2. Copy sample config text to it 
``module.exports = {
username:  'USERNAME-HERE',
password:  'PASSWORD-HERE',
customCaption:  "CUSTOM-CAPTION-HERE",
apiKey:  'API-KEY-HERE',
count:  5,
delay:  20,
breedMessage:  true
};``
3. Update the config file according to your information (See ``All Config Fields`` for more information)

## How To Run
1. Create an empty folder
2. Open Command Prompt in folder and type 
``git clone https://github.com/xKenpar/project-kedy.git`` 
3. After that, type `` npm install`` to install necessary libraries (REQUIRES NODEJS AND NPM)
4. Copy the configuration file you made into ``src`` folder
5. Lastly, type ``npm start`` to start the bot. (Make sure you created the config file)
## All Config Fields
- username : NECESSARY Username of instagram account
- password : NECESSARY Password of instagram account
- apiKey : NECESSARY Api Key you got from ``https://thecatapi.com``
- count : NECESSARY Count of posts to be shared
- delay : NECESSARY Delay between post sharing
- customCaption : OPTIONAL Custom Caption
- breedMessage : OPTIONAL Message shows breed of cat
