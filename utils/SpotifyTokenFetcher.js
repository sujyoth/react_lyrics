import { AsyncStorage } from 'react-native'
import { Cache } from 'react-native-cache'
import { AuthSession } from 'expo'
import * as Base64 from 'base-64'
import * as Keys from '../assets/keys.json'

var cache = new Cache({
    namespace: 'accessTokenCache',
    policy: {
        maxEntries: 2
    },
    backend: AsyncStorage
})


const handleSpotifyLogin = async () => {
    
    let redirectUrl = AuthSession.getRedirectUrl()

    let results = await AuthSession.startAsync({
        authUrl: `https://accounts.spotify.com/authorize?client_id=${Keys['client-id']}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user-read-currently-playing&response_type=code`
    })

    if (results.type !== "success") {
        console.log("Login Unsuccessful.")
    } else {
        console.log('Login Successful.')

        console.log('Fetching Refresh Token and Access Token...')
        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: `grant_type=authorization_code&code=${results.params.code}&redirect_uri=${redirectUrl}`,
            headers: {
                'Authorization': 'Basic ' + Base64.encode(`${Keys['client-id']}` + ":" + `${Keys['client-secret']}`),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                cache.setItem('access_token', data.access_token, err => {
                    (err == undefined) ? console.log("Fetched access token cached.") : console.log(err)
                })
                cache.setItem('refresh_token', data.refresh_token, err => {
                    (err == undefined) ? console.log("Fetched refresh token cached.") : console.log(err)
                })
            })
    }
}

const fetchToken = (setAccessToken) => {
    console.log('Fetching access token.')
    cache.getAll((err, entry) => {
        if (err == undefined && entry['refresh_token'] !== null && entry['refresh_token'] !== undefined) {
            console.log('Cached refresh token retrieved.')

            const url = 'https://accounts.spotify.com/api/token'
            fetch(url, {
                method: 'POST',
                body: `grant_type=refresh_token&refresh_token=${entry['refresh_token']}`,
                headers: {
                    'Authorization': 'Basic ' + Base64.encode(`${Keys['client-id']}` + ":" + `${Keys['client-secret']}`),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setAccessToken(data['access_token'])
                    cache.setItem('access_token', data['access_token'], (err) => {
                        (err == undefined) ? console.log("Fetched access token cached.") : console.log(err)
                    })
                })
                .catch(error => { console.log(error) })

        } else {
            console.log('Refresh token does not exist in cache.')
            handleSpotifyLogin()
        }
    })

}

const getAccessToken = async (setAccessToken) => {
    cache.getAll((err, entry) => {
        if (err == undefined && entry['access_token'] !== null && entry['access_token'] !== undefined) {
            if (Date.now() - Date.parse(entry['access_token']['created']) < 3000000) {
                console.log('Cached access token has not expired yet.')
                console.log('entry', entry)
                setAccessToken(entry['access_token']['value'])
                console.log("Cached access token retrieved.")
            } else {
                console.log('Cached access token has expired.')
                fetchToken(setAccessToken)
            }
        } else {
            console.log('Access token does not exist in cache.')
            fetchToken(setAccessToken)
        }
    })
}

const getNowPlaying = (setNowPlaying, setAccessToken) => {
    console.log('Fetching now playing...')
        cache.getAll((err, entry) => {
            if (err == undefined && entry.access_token !== null && entry.access_token !== undefined) {
                fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        'Authorization': `Bearer ${entry.access_token.value}`
                    }
                })
                    .then(async response => {
                        if (response.status == 204) {
                            console.log('No song playing')
                        } else {
                            const trackInfo = await response.json()
                            setNowPlaying(trackInfo.item.name)
                            console.log('Now playing: ', trackInfo.item.name)
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                console.log('Invalid access token.')
                getAccessToken(setAccessToken)
            }
        })
}

export { getAccessToken, getNowPlaying }