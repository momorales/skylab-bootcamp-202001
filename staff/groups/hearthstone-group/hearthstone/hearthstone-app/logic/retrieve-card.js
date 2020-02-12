function retrieveCard(token, locale, id, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof id !== 'number') throw new TypeError(`${id} is not a number`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub

    if (locale === '' || typeof locale === 'undefined') locale = 'en_US'

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`,{

        method:'GET',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
        body: undefined
    }, (error, response) => {
        if(error) return callback(error)

        if(response.status === 200){
            const user  = JSON.parse(response.content)
            // if (_error) return callback(new Error(_error)) 

        

        call(`https://eu.api.blizzard.com/hearthstone/cards?locale=${locale}&access_token=EUNnUMPm3AYTiVNRZVQ05R4j4kka67IbEZ&id=${id}`, undefined,
         (error, response) => {
            if (error) return callback(error)

            if (response.status === 200) {
                let detailInfo = JSON.parse(response.content)
                detailInfo = detailInfo.cards[0]

                if (typeof user.favs !== 'undefined') {
                    user.favs.includes(id)? detailInfo.isFav = true : detailInfo.isFav = false
                    callback(undefined, detailInfo)
                } else {
                    detailInfo.isFav = false
                    callback(undefined, detailInfo)
                }
            }

        })
    }
    })
}