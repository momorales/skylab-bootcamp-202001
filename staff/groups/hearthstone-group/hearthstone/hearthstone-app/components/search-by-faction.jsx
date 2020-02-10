function SearchByFaction(onSubmit, onToBack) {
    return <form className='by-faction' onSubmit={event => {
        event.preventDefault()
        let query = setQuery('factions', event.target.factions.value, { cost: event.target.cost.value, attack: event.target.attack.value, durability: event.target.durability.value, health: event.target.health.value })
        onSubmit(query)
    }}>

        <h2>SEARCH CARDS BY FACTION</h2>

        <a href="" onClick={event => {
            event.preventDefault()
            onToBack()
        }}>GO BACK</a>
        
        <input type="checkbox" name="horde" value="Horde" />Horde
        <input type="checkbox" name="alliance" value="Alliance" />Alliance
        <input type="checkbox" name="neutral" value="Neutral" />Neutral

        </form>
}


