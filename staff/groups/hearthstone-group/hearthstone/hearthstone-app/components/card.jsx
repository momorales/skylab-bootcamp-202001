function Card({ cardInfo: { cardId, name, img } }, onClick, onWL, onDeck) {
    return <li className = "results__card">
        <h2>{`${name} (${cardId})`}</h2>

        <img src={img}
            onClick={() => onClick(cardId)} />
        <span>10/10 (500)</span>

        <button onClick={() => onWL(cardId)}>Add to wishlist</button>
        <button onClick={() => onDeck(cardId)}>Add to deck</button>
    </li>
}

