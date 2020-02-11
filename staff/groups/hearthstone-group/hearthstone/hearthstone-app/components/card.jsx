function Card({ cardInfo: { id, name, image } , onClick, onWL, onDeck}) {
    return <li className = "results__card">
        <h2>{name}</h2>

       { image && <img src={image}
            onClick={() => onClick(id)} />}

       { !image && <img src="https://legaldbol.com/wp-content/uploads/2019/03/48-Free-Printable-Card-Template-Hearthstone-in-Photoshop-by-Card-Template-Hearthstone.jpg"
            onClick={() => onClick(id)} />}

        <span>10/10 (500)</span>

        <button onClick={() => onWL(id)}>Add to wishlist</button>
        <button onClick={() => onDeck(id)}>Add to deck</button>
    </li>
}

