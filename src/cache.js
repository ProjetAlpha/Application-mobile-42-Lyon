import GetApiData from './get_api_data.js'
import  { AsyncStorage } from 'react-native';

export default class Cache
{
  constructor(){
    this.needUpdate = false
    this.apiDataManager = new GetApiData()
    this.checkUpdate()
    setInterval(() => this.checkUpdate(), 300000)
  }

  async checkUpdate(){
      try {
        console.log('call needUpdate !')
        const data = await AsyncStorage.multiGet(['api_data', 'refresh_timing'])
        const startTime = data[1][1] ? JSON.parse(data[1][1]).time : 0
        const value = data[0][1]
        const endTime = Date.now()
        const elapsedTime = Math.floor((endTime - startTime) / 1000)
        if (value === null || (value !== null && elapsedTime > 300))
          this.needUpdate = true
        else
          this.needUpdate = false
      } catch (e) {
        console.log(e)
      }
  }

  async updatedData(){
    try {
        this.needUpdate = false
        const items = await this.apiDataManager.getAuthToken('__ID__',
        '__SECRET__')
        await AsyncStorage.multiSet([['api_data', JSON.stringify(items)], ['refresh_timing', JSON.stringify({time:Date.now()})]])
        return (items)
    } catch (e) {
      console.log(e)
    }
  }

  async getData(){
    const value = JSON.parse(await AsyncStorage.getItem('api_data'));
    return (value);
  }
}
