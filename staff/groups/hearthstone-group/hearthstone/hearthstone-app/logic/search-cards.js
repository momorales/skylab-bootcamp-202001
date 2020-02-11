function searchCards (query, token, locale, callback){
    if (typeof query !== 'undefined') {
        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    }

    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

    if (locale === '') locale = 'en_US'

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`,{

        method:'GET',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
        body: undefined
    }, (error, response) => {
        if(error) return callback(error)
        if(response.content){
            const user  = JSON.parse(response.content), {error: _error} = user
            if (_error) return callback(new Error(_error)) 

        }
        debugger
        call(`https://eu.api.blizzard.com/hearthstone/cards?locale=${locale}&access_token=EUNnUMPm3AYTiVNRZVQ05R4j4kka67IbEZ&pageSize=9999&${query}`, {
            method :'GET'
        }, (error, response) => {
            if(error) return callback(error)
            
            if(response.status === 200){
                let results = JSON.parse(response.content)    
                
                console.log(results)
                results = results.cards
                callback (undefined, results)
            }
        })
    })
}