const { Component, Fragment } = React
class App extends Component {
    state = { view: undefined, user: undefined, loggedIn: false, error: undefined, token: undefined, cards: undefined, card: undefined, query: undefined }

    componentWillMount () {
        const { token } = sessionStorage
        if (token) {
            
            retrieveUser(token, (error, user) => {
                if (error) {
                    this.__handleError__(error)
                } else {
                
                    this.setState({ view: 'search', user, loggedIn: true, token})
                }
            })
        } else {
            this.setState({view: 'login'})
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
        } catch(error) {
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
                
                this.setState({cards})
            }
        })
    }

    handleToQualities = () => {
        this.setState({ view: 'byqualities' })
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
        this.setState({ user: undefined, token: undefined, view: 'login', loggedIn: false })
    }

    render() {
        const { props: { title }, state: { view, error, loggedIn, cards, card, user, query}, handleLogout, handleToQualities, handleGoToRegister, handleToggleDeck, handleDetailBack, handleToggleWL, handleDetails, handleLogin, handleSearch, handleRegister, handleGoToLogin, handleToWishlist, handleToDeck } = this
        return <Fragment>

        {user && <BtnsLogged user={user} onWishlist={handleToWishlist} onDeck={handleToDeck}/>}

        {/* {user && <Fragment><h2>{user.name} <button onClick={handleLogout}>Logout</button></h2></Fragment>} */}

        { <h1>{title}</h1> }

        { view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} error={error}/> }
       
        { view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleGoToLogin} error={error} /> }
       
        { view === 'search' && loggedIn && <Search onSubmit={handleSearch} onToQualities={handleToQualities}/> }

        { view === 'byqualities' && loggedIn && <SearchByQuality onSubmit={handleSearch} onToBack={handleDetailBack}/>}

        { view === 'search' || view === 'byqualities' && loggedIn && cards && <Results results={cards} onItemClick={handleDetails} onItemWL={handleToggleWL} onItemDeck={handleToggleDeck}/>}

        { view === 'details' && loggedIn && card && <Details detailInfo={card} onItemWL={handleToggleWL} onItemDeck={handleToggleDeck} onBackClick={handleDetailBack}/>} 
        </Fragment>
   }
}