function Results({ results, onItemClick, onItemWL, onItemDeck }) {
    return <ul className="results" >
        {results.map( result => 
            <Card key ={result.cardId}
                    cardInfo={result} 
                    onClick={onItemClick} 
                    onWL={onItemWL} 
                    onDeck={onItemDeck} />
        )}
    </ul>
}


