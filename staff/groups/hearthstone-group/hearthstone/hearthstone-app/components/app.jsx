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
                    
                    // if (location.search) {
                    //     const query = location.search.split('?')[1]
                    //     debugger
                    //     searchCards(query, token, locale, (error, cards) => {
                    //         if (error) {
                    //             this.__handleError__(error)
                    //         } else {
                    //             this.setState({ view: 'search', cards, user, query, locale })
                    //         }
                    //     })
                    // } else {
                    //     this.setState({ view: 'search', user })
                    // }
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
    
    handleSearch = (query, locale) => {
        const { token } = sessionStorage
        
        searchCards(query, token, locale, (error, cards) => {
            if (error) {
                this.__handleError__(error)
            } else {

                this.setState({query, locale, cards})
            }
        })
    }

    handleToQualities = () => {
        this.setState({ view: 'byqualities', cards: undefined})
    }
    
    handleToClasses = () => {
        this.setState({ view: 'byclasses', cards: undefined})
    }
    
    handleToRaces = () => {
        this.setState({ view: 'byraces', cards: undefined})
    }
   
    handleToType = () => {
        this.setState({ view: 'bytype', cards: undefined})
    }
  
    handleToFaction = () => {
        this.setState({ view: 'byfaction', cards: undefined})
    }

    handleToWishlist = () => {
        //
    }

    handleToDeck = () => {
        //
    }

    handleDetails = id => {
        const { token } = sessionStorage, { locale } = this.state
        
        retrieveCard(token, locale, id, (error, card) => {
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
        const { props: { title }, state: { view, error, loggedIn, cards, card, user, query}, handleLogout, handleToQualities, 
        handleGoToRegister, handleToggleDeck, handleDetailBack, handleToggleWL, handleDetails, handleLogin, handleSearch, 
        handleRegister, handleGoToLogin, handleToWishlist, handleToDeck, handleToType, handleToClasses, handleToRaces, handleToFaction } = this
         
        return <Fragment>

        {user && <BtnsLogged user={user} onWishlist={handleToWishlist} onDeck={handleToDeck}/>}

        {/* {user && <Fragment><h2>{user.name} <button onClick={handleLogout}>Logout</button></h2></Fragment>} */}

        { <h1>{title}</h1> }

        { view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} error={error}/> }
       
        { view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleGoToLogin} error={error} /> }
       
        { view === 'search' && loggedIn && <Search query={query} onSubmit={handleSearch} onToQualities={handleToQualities}
         onToType={handleToType} onToClasses={handleToClasses} onToRace= {handleToRaces} onToFaction={handleToFaction} /> } {/*mirarlo con Alex */}

        { view === 'byqualities' && loggedIn && <SearchByQuality onSubmit={handleSearch} onToBack={handleDetailBack}/>}

        { view === 'byclasses' && loggedIn && <SearchByClass onSubmit={handleSearch} onToBack={handleDetailBack} />}

        { view === 'byraces' && loggedIn && <SearchByRaces onSubmit={handleSearch} onToBack={handleDetailBack}/>}

        { view === 'bytype' && loggedIn && <SearchByType onSubmit={handleSearch} onToBack={handleDetailBack}/>}

        { view === 'byfaction' && loggedIn && <SearchByFaction onSubmit={handleSearch} onToBack={handleDetailBack}/>}

        { loggedIn && cards && !card && <Results results={cards} onLocaleSubmit={handleSearch} onItemClick={handleDetails} onItemWL={handleToggleWL} onItemDeck={handleToggleDeck}/>}

        { view === 'details' && loggedIn && card && <Details detailInfo={card} onItemWL={handleToggleWL} onItemDeck={handleToggleDeck} onBackClick={handleDetailBack}/>} 
        </Fragment>
   }
}