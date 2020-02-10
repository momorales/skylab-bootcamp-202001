function Details({detailInfo: {imgGold, name, cardId, cardSet, type, text, playerClass}, onBackClick, onItemWL, onItemDeck}){
    return <div className = 'details'>

        <a href='' onClick={event => {
            event.preventDefault()
            onBackClick()
        }}>BACK</a>
        {imgGold && <img src={imgGold} />}
        {!imgGold && <img src ="https://legaldbol.com/wp-content/uploads/2019/03/48-Free-Printable-Card-Template-Hearthstone-in-Photoshop-by-Card-Template-Hearthstone.jpg"/>}
        <ul className = 'card-info'>
            <li><b>Name: </b>{`${name} (${cardId})`}</li>
            <li><b>Card Set: </b>{cardSet}</li>
            <li><b>Type: </b>{type}</li>
            <li><b>Description: </b>{text}</li>
            <li><b>Faction: </b>{playerClass}</li>
        </ul>
        <span>Score: 7/10 (50)</span>
        <button className = 'btn-wishlist' onClick={event => {
            event.preventDefault()
            onItemWL(cardId)
        }}>Add to wishlist</button>

        
        <button className = 'btn-deck' onClick={event => {
            event.preventDefault()
            onItemDeck(cardId)
        }}>Add to deck</button>
    </div>
}


