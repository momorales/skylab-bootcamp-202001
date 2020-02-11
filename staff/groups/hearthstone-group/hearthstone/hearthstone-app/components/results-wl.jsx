function ResultsWL({ results, onToBack, onItemClick, onWL, onItemDeck }) { debugger
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
                    onDeck={onItemDeck} />
            )}
        </ul>
    </div>
}

