const Instagram = require('instagram-web-api')
const querystring = require('querystring')
const r2 = require('r2')
const {
  username,
  password, 
  apiKey,
  count, 
  delay, 
  customCaption,
  breedMessage
  } = require('./config.js');
const CAT_API_URL = " https://api.thecatapi.com/";

if(!username||!password||!apiKey||!count||!delay){
  console.log("Necessary Configuration Fields Not Assigned");
  return;
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
  let postedCount = 0;
  while(count>postedCount||count<0){
    let res = await postNew();
    if(res){
      postedCount++;
      if(count!=postedCount-1){
        await sleep(delay*1000);
      }
    }
  }
  console.log("Program Ended Successfully!\nPosted \""+(postedCount+1)+"\" Images");
  client.logout();
}

async function postNew() {
  try {
    var images = await loadImage();

    if(!images){
      console.log("Hata");
      return;
    }

    var image = images[0];
    var breed = image.breeds[0];
    
    const photo = image.url;

    let caption = (breedMessage ?'Breed : ' + (breed ? breed.name : 'Unknown' ) + "\n" : "" );
    caption += (customCaption ? customCaption : "Coded By Kenpar\nVisit Kodrehberim.com For More");
    client.uploadPhoto({ photo, caption: caption, post: 'feed' });
    console.log("Posted A New Photo");
    return true;

  } catch (error) {
    console.log(error);
    return false;
  }
}

async function loadImage() {
  var headers = {
    "X-API-KEY": apiKey
  };
  var query_params = {
    mime_types: "jpg,png",
    size: "medium,small",
    limit: 1
  };
  let queryString = querystring.stringify(query_params);
  try {
    let _url = CAT_API_URL + `v1/images/search?${queryString}`;
    var response = await r2.get(_url, { headers }).json;
  } catch (e) {
    console.log(e);
    return false;
  }
  return response;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  