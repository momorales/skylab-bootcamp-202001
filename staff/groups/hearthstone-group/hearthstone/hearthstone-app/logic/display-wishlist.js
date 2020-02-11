function displayWishlist (token, locale, callback){
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub
    
    if(locale === '' || typeof locale === 'undefined') locale = 'en_US'

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`,{

        method:'GET',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
        body: undefined
    }, (error, response) => {
        if(error) return callback(error)
            
        //if (_error) return callback(new Error(_error)) 

        if(response.status === 200){
            const user  = JSON.parse(response.content)
        
            let i = 0
            const listedCards = []
            
            for (i = 0; i < user.favs.length; i++) {

                call(`https://eu.api.blizzard.com/hearthstone/cards?locale=${locale}&access_token=EUNnUMPm3AYTiVNRZVQ05R4j4kka67IbEZ&pageSize=9999&id=${user.favs[i]}`, {
                        method :'GET'
                    }, (error, response) => {
                        if(error) return callback(error)
                        
                        if (response.status === 200) {
                            let detailInfo = JSON.parse(response.content)
                            detailInfo = detailInfo.cards[0]
                            detailInfo.isFav = true
    
                           
                            listedCards.push(detailInfo)
                            if (i === user.favs.length) {
                                
                                callback(undefined, listedCards)
                            }
                        }
                })
                
            }    

            
        }
    })
}    