import { AuthSession } from 'expo'
import * as Base64 from 'base-64'
import * as Keys from '../assets/keys.json'

const handleSpotifyLogin = async (setAccessToken) => {
    let redirectUrl = AuthSession.getRedirectUrl()
    let results = await AuthSession.startAsync({
        authUrl: `https://accounts.spotify.com/authorize?client_id=${Keys['client-id']}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user-read-recently-played+user-read-currently-playing&response_type=code`
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
                Keys['access_token'] = data.access_token
                Keys['access_token_created_on'] = Date.now()
                setAccessToken(data.access_token)
                Keys['refresh_token'] = data.refresh_token
                console.log('Access token and refresh token cached.')
            })
    }
}

const fetchToken = (setAccessToken) => {
    console.log('Fetching access token.')
    const refresh_token = Keys['refresh_token']
    if (refresh_token !== undefined) {
        console.log('Cached refresh token retrieved.')

        const url = 'https://accounts.spotify.com/api/token'
        fetch(url, {
            method: 'POST',
            body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
            headers: {
                'Authorization': 'Basic ' + Base64.encode(`${Keys['client-id']}` + ":" + `${Keys['client-secret']}`),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                setAccessToken(data['access_token'])
                console.log('hells bells', data)
                Keys['access_token'] = data.access_token
                Keys['access_token_created_on'] = Date.now()
                console.log("Fetched access token cached.")
            })
            .catch(error => console.log(error))
    } else {
        console.log('Refresh token does not exist in cache.')
        handleSpotifyLogin(setAccessToken)
    }
}

const getAccessToken = async (setAccessToken) => {
    const access_token = Keys['access_token']
    const created_on = Keys['access_token_created_on']
    if (access_token !== undefined) {
        if (Date.now() - created_on < 3000000) {
            console.log('Cached access token has not expired yet.')
            setAccessToken(access_token)
            console.log('Cached access token retrieved')
        } else {
            console.log('Cached access token has expired.')
            fetchToken(setAccessToken)
        }
    } else {
        console.log('Access token does not exist in cache.')
        fetchToken(setAccessToken)
    }
}

const getNowPlaying = (setNowPlaying, setAccessToken) => {
    console.log('Fetching now playing...')
    const access_token = Keys['access_token']
    if (access_token !== undefined) {
        fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(async response => {
                if (response.status == 204) {
                    console.log('No song playing.')
                } else {
                    const trackInfo = await response.json()
                    setNowPlaying(trackInfo)
                    console.log(`Now Playing: ${trackInfo.item.name} - ${trackInfo.item.artists[0].name}`)
                }
            })
            .catch(error => console.log(error))
    } else {
        console.log('Invalid access token.')
        getAccessToken(setAccessToken)
    }
}

export { getAccessToken, getNowPlaying }