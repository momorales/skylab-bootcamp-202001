function ResultsWL({ results, onToBack, onItemClick, onWL, onItemDeck, onRating }) {
    return <div className='wishlist'>
        {!results && <div className='wishlist__container-card'><p>No cards on wishlist. Go add some!</p>
            <button className='wishlist__arrow' onClick={event => {
                event.preventDefault()
                onToBack()
            }}><i className="fas fa-arrow-left"/></button></div>}

        {results && <div className='wishlist__container-card'><button className='wishlist__arrow' onClick={event => {
            event.preventDefault()
            onToBack()
        }}><i className="fas fa-arrow-left"/></button>
            <ul className="results" >
                {results.map(result =>
                    <Card key={result.id}
                        cardInfo={result}
                        onClick={onItemClick}
                        onWL={onWL}
                        onDeck={onItemDeck}
                        onRating={onRating} />
                )}
            </ul></div>}
    </div>
}

