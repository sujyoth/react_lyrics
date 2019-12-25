import JSSoup from 'jssoup'

const fetchLyrics = async (songName, artistName) => {
    const url = `https://api.genius.com/search?q=${songName} ${artistName}`
    await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer RcmP8mpY_CwECczrhTP4NvYh358ZDZxCy346dfkf2NRdUFGcuP9wJovLy5_hSGkz'
        }
    })
        .then(response => response.json())
        .then(data => {
            const response = data.response.hits
            for (i in response) {
                if (response[i]['result']['primary_artist']['name'].toLowerCase() == artistName.toLowerCase()) {
                    const url = response[i]['result']['url']
                    fetch(url)
                        .then(resp => resp.text())
                        .then(async text => {
                            const soup = new JSSoup(text)
                            lyrics = await soup.find('div', class_ = 'lyrics').getText().replace(/\[/g, '\n[').replace(/\]/g, ']\n').replace(/\]\n\n/g, ']\n').trim()
                            return lyrics
                        })
                }
            }
        })
        .catch(error => console.log(error))
}

export default fetchLyrics
