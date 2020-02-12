function Results({ results, onItemClick, onWL, onItemDeck }) { debugger
    return <div>
        <ul className="results" >
            {results.map(result =>
                <Card key={result.id}
                    cardInfo={result}
                    onClick={onItemClick}
                    onWL={onWL}
                    onDeck={onItemDeck} />
            )}
        </ul>
    </div>
}


