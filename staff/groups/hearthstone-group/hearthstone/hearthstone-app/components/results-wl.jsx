function ResultsWL({ results, onToBack, onItemClick, onWL, onItemDeck, onRating }) { debugger
    return <div>
        <button onClick={event => {
            event.preventDefault()
            onToBack()
        }}>GO BACK</button>
        <ul className="results" >
            {results.map(result =>
                <Card key={result.id}
                    cardInfo={result}
                    onClick={onItemClick}
                    onWL={onWL}
                    onDeck={onItemDeck}
                    onRating={onRating} />
            )}
        </ul>
    </div>
}

