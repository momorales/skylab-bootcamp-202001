function ResultsWL({ results, onToBack, onItemClick, onWL, onItemDeck, onRating }) {
    return <div className='wishlist'>
<<<<<<< HEAD
        {!results && <div><p>No cards on wishlist. Go add some!</p>
=======
        {!results && <div className='wishlist__container-card'><p>No cards on wishlist. Go add some!</p>
>>>>>>> 5d090092b09220c25c0dee67a4bc05c680573659
            <button className='wishlist__arrow' onClick={event => {
                event.preventDefault()
                onToBack()
            }}><i className="fas fa-arrow-left"/></button></div>}

<<<<<<< HEAD
        {results && <div><button className='wishlist__arrow' onClick={event => {
                event.preventDefault()
                onToBack()
            }}><i className="fas fa-arrow-left"/></button>
=======
        {results && <div className='wishlist__container-card'><button className='wishlist__arrow' onClick={event => {
            event.preventDefault()
            onToBack()
        }}><i className="fas fa-arrow-left"/></button>
>>>>>>> 5d090092b09220c25c0dee67a4bc05c680573659
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

