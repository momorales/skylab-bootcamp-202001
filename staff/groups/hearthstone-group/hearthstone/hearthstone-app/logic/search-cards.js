function searchCards (query, token, locale, callback){
    if (typeof query !== 'undefined') {
        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    }

    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

    if (locale === '' || typeof locale === 'undefined') locale = 'en_US'

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub
    

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`,{

        method:'GET',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
        body: undefined
    }, (error, response) => {
        if(error) return callback(error)

        if(response.status === 200){
            // const {error: _error} = user
            const user  = JSON.parse(response.content)
            // if (_error) return callback(new Error(_error)) 

        

        call(`https://eu.api.blizzard.com/hearthstone/cards?locale=${locale}&access_token=EUNnUMPm3AYTiVNRZVQ05R4j4kka67IbEZ&pageSize=9999&${query}`, {
            method :'GET'
        }, (error, response) => {
            if(error) return callback(error)
            
            if(response.status === 200){
                let results = JSON.parse(response.content)    
                
                
                results = results.cards

                if(typeof user.favs !== 'undefined') {
                    results.map(card => {
                        user.favs.includes(card.id) ? card.isFav = true : card.isFav = false
                    })
                }

                callback (undefined, results)
            }
        })

    }
    })
}