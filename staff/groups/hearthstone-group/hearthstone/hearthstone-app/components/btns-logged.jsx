function BtnsLogged({ onWishlist, onDeck }) {
    return (
        <header className='header'>

            <section className='header__image-container'>
                
                    <img src='../hearthstone-template/logo.png' className='header__logo' />
                
            </section>

            <section className='header__buttons-container'>

                <div className='header__button'>
                    <button className="header__deck"><a href="" className='header__anchor' onClick={event => {
                        event.preventDefault()
                        onDeck()
                    }} >LOGOUT</a>
                    </button>
                </div>
                
                <div className='header__button'>
                    <button className="header__deck" ><a href="" className='header__anchor' onClick={event => {
                        event.preventDefault()
                        onWishlist()
                    }}>WISHLIST</a></button>
                </div>

            </section>
        </header>
    )
}