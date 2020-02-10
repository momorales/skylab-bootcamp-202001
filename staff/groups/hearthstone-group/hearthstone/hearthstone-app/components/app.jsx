const { Component, Fragment } = React
class App extends Component {
    state = { view: undefined, user: undefined, loggedIn: false, error: undefined, token: undefined, cards: undefined, card: undefined }
    componentWillMount() {
        const { token } = sessionStorage
        if (token) {
            retrieveUser(token, (error, user) => {
                if (error) {
                    this.__handleError__(error)
                } else {
                    this.setState({ loggedIn: true, view: 'search', user })
                }
            })
        } else {
            this.setState({ view: 'login' })
        }
    }
    __handleError__ = error => {
        this.setState({ error: error.message + " :^(" })
        setTimeout(() => {
            this.setState({ error: undefined })
        }, 3000)
    }
    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, token) => {
                if (error) {
                    this.__handleError__(error)
                } else {
                    sessionStorage.token = token
                    retrieveUser(token, (error, user) => {
                        if (error) {
                            this.__handleError__(error)
                        } else {
                            this.setState({ user })
                        }
                    })
                    this.setState({ view: 'search', token, loggedIn: true })
                }
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }
    handleGoToRegister = () => {
        this.setState({ view: 'register' })
    }
    handleRegister = (name, surname, username, password, age, gender) => {
        try {
            registerUser(name, surname, username, password, age, gender, error => {
                if (error) {
                    this.__handleError__(error)
                } else {
                    this.setState({ view: 'login' })
                }
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }
    handleGoToLogin = () => {
        this.setState({ view: 'login' })
    }
    handleSearch = query => {
        const { token } = sessionStorage
        searchCards(query, token, (error, cards) => {
            if (error) {
                this.__handleError__(error)
            } else {
                this.setState({ cards })
            }
        })
    }
    handleToWishlist = () => {
        //
    }
    handleToDeck = () => {
        //
    }
    handleDetails = id => {
        const { token } = sessionStorage
        retrieveCard(token, id, (error, card) => {
            if (error) {
                this.__handleError__(error)
            } else {
                this.setState({ view: 'details', card })
            }
        })
    }
    handleDetailBack = () => {
        this.setState({ view: 'search', card: undefined })
    }
    handleToggleWL = () => {
        //
    }
    handleToggleDeck = () => {
        //
    }
    handleLogout = () => {
        sessionStorage.clear()
        this.setState({ user: undefined, token: undefined, view: 'login', loggedIn: false, cards: undefined, card: undefined })
    }
    handleFilter = () => {
        const acc = document.getElementsByClassName("accordion");
        let i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }
    }

    render() {
        const { props: { title }, state: { view, error, loggedIn, cards, card, user }, handleLogout, handleGoToRegister, handleToggleDeck, handleDetailBack, handleToggleWL, handleDetails, handleLogin, handleSearch, handleRegister, handleGoToLogin, handleToWishlist, handleToDeck, handleFilter } = this
        return <Fragment>
            {loggedIn && <BtnsLogged onWishlist={handleToWishlist} onDeck={handleToDeck} />}
            {loggedIn && user && <Fragment><h2>{user.name} <button onClick={handleLogout}>Logout</button></h2></Fragment>}
            {<h1>{title}</h1>}
            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} error={error} />}
            {view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleGoToLogin} error={error} />}
            {view === 'search' && <Search onSubmit={handleSearch} onClick={handleFilter} />}
            {view === 'search' && cards && <Results results={cards} onItemClick={handleDetails} onItemWL={handleToggleWL} onItemDeck={handleToggleDeck} />}
            {view === 'details' && card && <Details detailInfo={card} onItemWL={handleToggleWL} onItemDeck={handleToggleDeck} onBackClick={handleDetailBack} />}
        </Fragment>
    }
}
