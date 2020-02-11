function Details({detailInfo: {image, name, id, cardSetId, text, flavorText}, onBackClick, onItemWL, onItemDeck}){
    return <div className = 'details'>

        <a href='' onClick={event => {
            event.preventDefault()
            onBackClick()
        }}>BACK</a>
        {image && <img src={image} />}
        {!image && <img src ="https://legaldbol.com/wp-content/uploads/2019/03/48-Free-Printable-Card-Template-Hearthstone-in-Photoshop-by-Card-Template-Hearthstone.jpg"/>}
        <ul className = 'card-info'>
            <li><b>Name: </b>{`${name} (${id})`}</li>
            <li><b>Card Set: </b>{cardSetId}</li>
            <li><b>Description: </b>{text}</li>
            <li><b>Flavor: </b><i>{`"${flavorText}"`}</i></li>
        </ul>
        <span>Score: 7/10 (50)</span>
        <button className = 'btn-wishlist' onClick={event => {
            event.preventDefault()
            onItemWL(id)
        }}>Add to wishlist</button>

        
        <button className = 'btn-deck' onClick={event => {
            event.preventDefault()
            onItemDeck(id)
        }}>Add to deck</button>
    </div>
}


