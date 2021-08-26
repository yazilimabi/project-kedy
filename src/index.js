const Instagram = require('instagram-web-api')
const querystring = require('querystring')
const r2 = require('r2')
let {
  username,
  password, 
  apiKey,
  count, 
  delay, 
  customCaption,
  breedMessage
  } = require('./config.js');
const CAT_API_URL = " https://api.thecatapi.com/";

let errorCount = 0;
let postedCount = 0;

if(!username||!password||!apiKey||!count||!delay){
  console.log("Necessary Configuration Fields Not Assigned");
  process.exit(1);
}

if(delay<10){
  delay = 10;
}
 
const client = new Instagram({ username, password })
 
client
  .login()
  .then(() => {
      main();
  })

async function main(){

  console.log("Project Kedy");
  console.log("An Instagram Bot Automatically Shares Random Cat Images");
  console.log("Contact kenpar@kodrehberim.com For Info Or Issues");

  while(count > postedCount||count < 0)
  {
    if(!errorCount)
    {
      console.log("Attempting To Post...");
    }
    
    let res = await postNew();
    if(!res.error)
    {
      errorCount = 0;
      postedCount++;

      if(count != postedCount-1)
      {
        await sleep(delay*1000);
      }

    }
    else
    {
      errorCount++;
    }
    
    if(errorCount==5){
      console.log("Error Occured In Sharing Cat Image! Trying Again!");
    }
    else if(errorCount>10)
    {
      console.log("10 Image Sharing Attempt Has Been Failed! Stopping Program...");
      return 0;
    }
  }
  console.log("Program Ended Successfully!\nPosted \""+(postedCount)+"\" Images");

}

async function postNew() {
  try 
  {
    var images = await loadImage();

    if(images.error){
      return {error: images.error};
    }

    var image = images[0];
    var breed = image.breeds[0];
    
    const photo = image.url;

    let caption = (breedMessage ?'Breed : ' + (breed ? breed.name : 'Unknown' ) + "\n" : "" );
    caption += (customCaption ? customCaption : "Coded By Kenpar\nVisit Kodrehberim.com For More");
    await client.uploadPhoto({ photo, caption: caption, post: 'feed' });
    
    var date_ob = new Date();

    console.log(date_ob.getHours() + ":" + date_ob.getMinutes() + ":" +  date_ob.getSeconds() + 
    " : Posted A New Photo \nCurrent Shared Image Count : " + (postedCount + 1));
    return {error: null};

  } 
  catch (error) 
  {
    return {error: error};
  }
}

async function loadImage() {
  var headers = {
    "X-API-KEY": apiKey
  };
  var query_params = {
    mime_types: "jpg,png",
    size: "big,medium,small",
    limit: 1
  };
  let queryString = querystring.stringify(query_params);
  try 
  {
    let _url = CAT_API_URL + `v1/images/search?${queryString}`;
    var response = await r2.get(_url, { headers }).json;
  } 
  catch (error) 
  {
    return {error: error};
  }
  return response;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  