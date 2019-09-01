
export default class GetApiData{

  async getImg(authToken){
    const url = 'https://api.intra.42.fr/v2/campus/9/locations?per_page=100&filter=active';
    const options  =  {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: ' Bearer '+authToken
       }
     }
     try{
       const response = await fetch(url, options)
       const json = await response.json();
       return (this.fetchImgUrl(json))
     }catch(e){
       console.log(e)
     }
  }

  fetchImgUrl(data){
    let userData = [];
    for (let i = 0; i < data.length; i++){
      if (data[i].end_at !== null)
        continue;
      const imgUrl = 'https://cdn.intra.42.fr/users/medium_'+data[i].user.login+'.JPG'
      const imgName = data[i].user.login
      const imgPath = './api_img/'+imgName+'.jpg'
      const hasDuplicate = userData.some(data => data['name'] === imgName)
      if (!hasDuplicate)
        userData = [...userData, {name:imgName,
          path:imgPath, link:imgUrl, host:data[i].host.split('.')[0], profil:'https://profile.intra.42.fr/users/'+imgName}]
    }
    return (userData)
  }

  async getAuthToken(clientId, clientSecret){
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
     try{
       const response = await fetch('https://api.intra.42.fr/oauth/token', options)
       const data = await response.json()
       const result = await this.getImg(data.access_token)
       return (result)
     } catch(e){
       console.log(e)
     }
  }
}
