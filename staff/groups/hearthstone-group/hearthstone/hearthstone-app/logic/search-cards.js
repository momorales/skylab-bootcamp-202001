function searchCards (query, token, callback){
    if (typeof query !== 'undefined') {
        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    }

    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

    // query.length? query : query=''

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
        
        call(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${query}`, {
            method :'GET',
            headers: {'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com', "x-rapidapi-key": 'b6eebce870msh7f0a04580a33075p10faf0jsn46955d428530'},
            body: undefined
        }, (error, response) => {
            if(error) return callback(error)
            
            if(response.status === 200){
                const results = JSON.parse(response.content)    
                console.log(results)           
                callback (undefined, results)
            }
        })
    })
}

                // let cardList = []
                // for (const key in results) {
                //     cardList.push(results[key])
                // }

                // cardList = cardList.flat(2)
                
                // const _cardList = []
                
                // debugger
                // cardList.forEach(card => {
                //     card.hasOwnProperty('img') ? _cardList.push(card) : cardList.push()
                // })

                // for (let i = 0; i < _cardList.length; i++) {
                //     let card = _cardList[i]
                //     if (card.name.toLowerCase().includes(query.toLowerCase())) {
                //         continue
                //     } else {
                //         _cardList.splice(i, 1)
                //         i--
                //     }
                // }  