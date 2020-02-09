const { Component, Fragment } = React
class Hearthstone extends Component {
    state = { view: 'login', loggedIn: false, error: undefined, token: undefined }

    __handleError__ = error => {
        this.setState({ error: error.message + " :^(" })

        setTimeout(() => {
            this.setState({ error: undefined })
        }, 3000)
    }

    handleLogin = (username, password) => {
        authenticateUser(username, password, (error, token) => {
            if (error) {
                this.__handleError__(error)
            } else {
                this.setState({ view: 'search' })
            }
        })
    }

    handleGoToRegister = () => {
        this.setState({ view: 'register' })
    }

    handleRegister = (name, surname, username, password, age, gender) => {
        registerUser(name, surname, username, password, age, gender, error => {
            if (error) {
                this.__handleError__(error)
            } else {
                this.setState({ view: 'login' })
            }
        })
    }

    handleGoToLogin = () => {
        this.setState({ view: 'login' })
    }
    
    handleSearch = () => {
        //
    }

    render() {
        const { props: { title }, state: { view, error, loggedIn }, handleGoToRegister, handleLogin, handleSearch, handleRegister, handleGoToLogin } = this
        { loggedIn === true && <a href="" className="wishlist">CHECK WISHLIST</a> }
        { loggedIn === true && <a href="" className="deck" >CHECK YOUR VIRTUAL DECK</a> }
        { <h1>{title}</h1> }
        { view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} /> }
        { view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleGoToLogin} error={error} /> }
        { view === 'search' && <Search onSubmit={handleSearch} /> }
   }
}