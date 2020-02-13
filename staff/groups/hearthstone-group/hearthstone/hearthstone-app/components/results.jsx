function Results({ results, onItemClick, onWL, onItemDeck, onRating }) { 
    return <div>
        <ul className="results" >
            {results.map(result =>
                <Card key={result.id}
                    cardInfo={result}
                    onClick={onItemClick}
                    onWL={onWL}
                    onDeck={onItemDeck} 
                    onRating={onRating}/>
            )}
        </ul>
    </div>
}


