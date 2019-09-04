/*const fetch = require('node-fetch');
const request = require('request');
const fs = require('fs');*/

class GetApiImg
{
  constructor(id, secret){
    this.getAuthToken(id, secret)
  }

  dowloadImg(uri, filename, type){
    return request.head(uri, function(err, res, body){
        if (err){
          console.error(err);
          return;
        }
        if (res.headers['content-length'] > 0 && res.headers['content-type'] == 'image/jpeg')
          request(uri).pipe(fs.createWriteStream(filename))
      }
    )
  }

  fetchImgUrl(data){
    let userData = [];
    //fs.readFileSync('./your-image.png', 'base64');
    // readDir et stock le nom dans array.
    for (let i = 0; i < data.length; i++){
      if (data[i].end_at !== null)
        continue;
      const imgUrl = 'https://cdn.intra.42.fr/users/medium_'+data[i].user.login+'.JPG'
      const imgName = data[i].user.login
      const imgPath = './api_img/'+imgName+'.jpg'
      const hasDuplicate = userData.some(data => data['name'] === imgName)
      if (!hasDuplicate)
        userData = [...userData, {name:imgName, path:imgPath, link:imgUrl, host:data[i].host, profil:data[i].user.url}]
      /*try {
        if (!fs.existsSync(imgPath))
          this.dowloadImg(imgUrl, imgPath)
      } catch(err) {
        console.error(err)
      }*/
    }
    // save to db.
    /*fs.writeFile('./img.json', JSON.stringify(userData), { flag: 'w+' }, function(err){
      if (err)
        console.log(err)
    });*/
  }

  getImg(authToken){
    const url = 'https://api.intra.42.fr/v2/campus/9/locations?per_page=100&filter=active';
    const options  =  {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: ' Bearer '+authToken
       }
     }
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => this.fetchImgUrl(data))
  }

  getAuthToken(clientId, clientSecret){
    const options  =  {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         'client_id': clientId,
         'client_secret': clientSecret,
         'grant_type': 'client_credentials'
       })
     }
      fetch('https://api.intra.42.fr/oauth/token', options)
      .then((res) => res.json())
      .then((data) => this.getImg(data.access_token))
  }
}
