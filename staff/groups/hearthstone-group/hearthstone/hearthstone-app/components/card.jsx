function Card({ cardInfo: { id, name, image, isFav } , onClick, onWL, onDeck}) {
    return <li className = "results__card">
        <h2>{name}</h2>

       { image && <img src={image}
            onClick={() => onClick(id)} />}

       { !image && <img src="https://legaldbol.com/wp-content/uploads/2019/03/48-Free-Printable-Card-Template-Hearthstone-in-Photoshop-by-Card-Template-Hearthstone.jpg"
            onClick={() => onClick(id)} />}

        <div>
            <span><i className="fas fa-star checked"></i></span>
            <span><i className="fas fa-star checked"></i></span>
            <span><i className="fas fa-star checked"></i></span>
            <span><i className="fas fa-star"></i></span>
            <span><i className="fas fa-star"></i></span>
            <p>7.5/10 (2)</p>
            
        </div>

        {isFav && <button onClick={event => {
            event.preventDefault()
            onWL(id)}}>WISHLISTED!</button>}
            
        {!isFav && <button onClick={event => {
            event.preventDefault()
            onWL(id)}}>Add to wishlist</button>}

        <button onClick={() => onDeck(id)}>Add to deck</button>
    </li>
}

