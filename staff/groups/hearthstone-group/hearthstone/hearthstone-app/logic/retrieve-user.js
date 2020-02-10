function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users/`,{

        method:'GET',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
        body: undefined
    }, (error, response) => {
        if(error) return callback(error)
        if(response.content){
            const {error : _error, user } = JSON.parse(response.content)
            if (_error) return callback(new Error(_error)) 

            if (user) return callback(user)
        }
    })
}