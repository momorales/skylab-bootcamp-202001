function Register({ onSubmit, onToLogin, error }) {
    return <form className="register" onSubmit={event => {
        event.preventDefault()
        const name = event.target.name.value
        const surname = event.target.surname.value
        const username = event.target.username.value
        const password = event.target.password.value
        const age = event.target.age.value
        const gender = event.target.gender.value
        onSubmit(name, surname, username, password, age, gender)
    }}>
        <h2>REGISTER</h2>
       
        <input className="textbox" type="text" name="name" placeholder="Name" />
        <input className="textbox" type="text" name="surname" placeholder="Surname" />
        <input className="textbox" type="text" name="username" placeholder="Username" />
        <input className="textbox" type="password" name="password" placeholder="Password" />
        Age: <input className="age" type="number" name="age" min="1" max="130" />
        <label>
            <input className="gender-radio" type="radio" name="gender" value="male" checked/>Male
        </label>
        <label>
            <input className="gender-radio" type="radio" name="gender" value="female"/>Female
        </label>
        <label>
            <input className="gender-radio" type="radio" name="gender" value="non-binary"/>Non-binary
        </label>
        {error && <Feedback level="error" message={error}/>}
        <input className="button" type="submit" placeholder="REGISTER" name="REGISTER"/>
        <a href= "" onClick={event => {
            event.preventDefault()
            onToLogin()
        }}>Go to Login</a>
    </form>
}