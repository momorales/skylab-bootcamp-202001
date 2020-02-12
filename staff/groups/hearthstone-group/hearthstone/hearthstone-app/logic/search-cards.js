function searchCards(query, token, locale, callback) {
    if (typeof query !== 'undefined') {
        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    }

    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

    if (locale === '' || typeof locale === 'undefined') locale = 'en_US'

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub

    function mean(value1, value2, div) {
        return parseFloat(((value1+value2)/div).toFixed(2))
    }


    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`, {

        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: undefined
    }, (error, response) => {
        if (error) return callback(error)

        if (response.status === 200) {
            // const {error: _error} = user
            const user = JSON.parse(response.content)
            // if (_error) return callback(new Error(_error)) 
            debugger
            call('https://skylabcoders.herokuapp.com/api/v2/users/all', {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            },
                (error, response) => {
                    if (error) return callback(error)

                   
                        const users = JSON.parse(response.content)
                        
                        let usersRating = []
                        users.map(user => {
                            (typeof user['hearthstone'] !== 'undefined') ? usersRating.push(user) : false
                        })

                        call(`https://eu.api.blizzard.com/hearthstone/cards?locale=${locale}&access_token=EU7c4yvfvI83T87hQBSii8r3IpHRQNf2c2&pageSize=9999&${query}`, {
                            method: 'GET'
                        }, (error, response) => {
                            if (error) return callback(error)

                            if (response.status === 200) {
                                let results = JSON.parse(response.content)


                                results = results.cards

                                results.map(card => {
                                    card.isFav = false
                                    card.totalValue = 0
                                    card.rating = 0
                                    card.rateCount = 0
                                    card.rateAvg = 0
                                })

                                if (typeof user.favs !== 'undefined') {
                                    results.map(card => {
                                        user.favs.includes(card.id) ? card.isFav = true : card.isFav = false
                                    })
                                }
                                debugger
                                for (let i = 0; i < usersRating.length; i++) {
                                    let userRating = usersRating[i]
                                    
                                    if (typeof userRating.rating !== 'undefined') {
                                        results.map(card => {
                                            for (let j = 0; j < userRating.rating.length; j++) {
                                                if (userRating.rating[j][0] === card.id) {
                                                    card.rating = userRating.rating[j][1]
                                                    card.rateCount++
                                                    card.rateAvg = mean(userRating.rating[j][1], card.totalValue, card.rateCount)
                                                    card.totalValue += userRating.rating[j][1]
                                                }

                                            }
                                                
                                        })
                                    }
                                }
                                console.log(results)
                                debugger
                                callback(undefined, results)
                            }
                        })
                    
                })
        }
    })
}