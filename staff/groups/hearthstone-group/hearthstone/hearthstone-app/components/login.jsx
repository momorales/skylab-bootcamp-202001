function Login({ onSubmit, onToRegister, error}) {
    return <form className = 'login'
        onSubmit={event => {
            event.preventDefault()

            const username = event.target.username.value
            const password = event.target.username.value

            onSubmit(username, password)
        }}>


        <h2>Login</h2>

        <input type="text" name="username" placeholder="Username" ></input>
        <input type="text" name="password" placeholder="Password" ></input>
        {error && <Feedback level='error' message={error} />}
        <button>Login</button>
        <a href=""
            onClick = {event =>{
                event.preventDefault()
                onToRegister()
            }}>Register</a>
    </form>
}