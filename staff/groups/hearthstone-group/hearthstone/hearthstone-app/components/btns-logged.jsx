function BtnsLogged ({user, onWishlist, onDeck}){
    return <div className = 'btns-logged'>
        <a href="" className="btns-logged__wishlist" onClick= {event => {
            event.preventDefault()
            onWishlist()
        }}>CHECK WISHLIST</a> 

    <h2>{`Hi ${user.name}! Welcome back!`}</h2>
        
        <a href="" className="btns-logged__deck" onClick= {event => {
            event.preventDefault()
            onDeck()
            }} >CHECK YOUR VIRTUAL DECK</a> 
    </div>
}