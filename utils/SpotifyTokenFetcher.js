import { AsyncStorage } from 'react-native'
import { Cache } from 'react-native-cache'
import Moment from 'react-moment'

var cache = new Cache({
  namespace: 'accessTokenCache',
  policy: {
      maxEntries: 2
  },
  backend: AsyncStorage
})

const getAccessToken = (setAccessToken) => {
    if cache.getItem('timeStamp')

    const url = 'https://accounts.spotify.com/api/token'
    fetch(url, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Authorization': 'Basic ' + Base64.encode(`${Keys['client-id']}` + ":" + `${Keys['client-secret']}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(data => {
            setAccessToken(data['access_token'])
            cache.setItem('accessToken', data['access_token'], function (err) {
                console.log("Spotify Access Token cached")
            })
            cache.setItem('timeStamp', Date.now(), function (err) {
                console.log("Timestamp cached")
            })
            console.log(data)
        })
        .catch(error => { })
}

export default getAccessToken