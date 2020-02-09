function Results({ results, onItemClick, onItemWL, onItemDeck }) {
    return <ul className="results" >
        {results.forEach( card => {
            <Card key ={card.cardId}
                    cardInfo={card} 
                    onClick={onItemClick} 
                    onWL={onItemWL} 
                    onDeck={onItemDeck} />
        })}
    </ul>
}


