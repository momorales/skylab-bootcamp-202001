function Results({ results, onItemClick, onItemWL, onItemDeck }) {
    return <div>
        <ul className="results" >
            {results.map(result =>
                <Card key={result.id}
                    cardInfo={result}
                    onClick={onItemClick}
                    onWL={onItemWL}
                    onDeck={onItemDeck} />
            )}
        </ul>
    </div>
}


