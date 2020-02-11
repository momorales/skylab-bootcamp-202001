function Search({ query, locale, onSubmit }) {
    return <form className="search" onSubmit={event => {
        event.preventDefault()

        locale = event.target.language.value
        const {attack, manacost, health, rarity, byclass} = event.target
        
        query = querySet({
            'textFilter': event.target.query.value,
            'manaCost': manacost.value,
            'attack': attack.value,
            'health': health.value,
            'rarity': rarity.value,
            'class': byclass.value
        })

        onSubmit(query, locale)
    }}>

        <h2>SEARCH CARDS</h2>
        <input className="browser" type="text" name="query" placeholder="Type here to search of a card" />
        <button>SEARCH</button>

        <br></br>

        Mana Cost: <input className="mana-cost" type="number" name="manacost" min="-1" max="10" />
        Attack: <input className="mana-cost" type="number" name="attack" min="-1" max="100" />
        Health: <input className="mana-cost" type="number" name="health" min="-1" max="100" />

        <br></br>

        <input type="radio"  name="rarity" value="basic" />Basic 
        <input type="radio"  name="rarity" value="common" />Common 
        <input type="radio"  name="rarity" value="rare" />Rare 
        <input type="radio"  name="rarity" value="epic"/>Epic 
        <input type="radio"  name="rarity" value="legendary"/>Legendary 

        <br></br>

        <input type="radio" name="byclass" value="druid" />Druid
        <input type="radio" name="byclass" value="hunter" />Hunter
        <input type="radio" name="byclass" value="mage" />Mage
        <input type="radio" name="byclass" value="paladin" />Paladin
        <input type="radio" name="byclass" value="priest" />Priest
        <input type="radio" name="byclass" value="rogue" />Rogue
        <input type="radio" name="byclass" value="shaman" />Shaman
        <input type="radio" name="byclass" value="warlock" />Warlock
        <input type="radio" name="byclass" value="warrior" />Warrior
        <input type="radio" name="byclass" value="dream" />Dream

        <br></br>

        <input type='submit' value="Select language" />
        <input type='radio' name='language' value='en_US' /> English (USA)
        <input type='radio' name='language' value='es_ES' /> Spanish
        <input type='radio' name='language' value='de_DE' /> German
        <input type='radio' name='language' value='fr_FR' /> French

    </form>
}