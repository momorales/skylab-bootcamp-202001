function authenticateUser(username, password, callback) {
    if (typeof username !== 'string') { throw new TypeError(`The username ${username} is not a string`) }
    if (typeof password !== 'string') { throw new TypeError(`The password ${password} is not a string`) }
debugger
    call("https://skylabcoders.herokuapp.com/api/v2/users/auth", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password})
    }, (error, response) => {
        if (error) return callback(error)

        const { error: _error, token } = JSON.parse(response.content)

        if (_error) return callback(new Error(_error))
                
        call(`https://skylabcoders.herokuapp.com/api/v2/users/`,{

            method:'GET',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
            body: undefined
        }, (error, response) => {
            if(error) return callback(error)

            if(response.content){
                const user  = JSON.parse(response.content), {error: _error} = user
                if (_error) return callback(new Error(_error)) 

                if(typeof user.hearthstone === 'undefined') return callback(new Error('Who are you?'))
                
                callback(undefined, token)
            }

        })
          
    })
}

