function retrieveCard(token, id, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`,{

        method:'GET',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
        body: undefined
    }, (error, response) => {
        if(error) return callback(error)
        if(response.content){
            const {error : _error, user } = JSON.parse(response.content)
            if (_error) return callback(new Error(_error)) 

        }

        call(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${id}`,{
            headers: {'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com', "x-rapidapi-key": 'b6eebce870msh7f0a04580a33075p10faf0jsn46955d428530'}
        }, (error, response) => {
            if (error) return callback(error)

            if (response.status === 200) {
                const detailInfo = JSON.parse(response.content)[0]
                console.log(detailInfo)
                callback(undefined, detailInfo)
            }

        })
    })
}