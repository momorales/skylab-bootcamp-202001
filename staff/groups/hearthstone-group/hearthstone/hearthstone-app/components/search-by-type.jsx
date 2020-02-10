function SearchByType({onSubmit, onToBack}){
    return <form className = "by-type" onSubmit ={event => {
        event.preventDefault()
<<<<<<< HEAD
        let query = querySet('type', event.target.type.value, {cost: event.target.manacost.value, attack: event.target.attack.value, durability: event.target.durability.value, health: event.target.health.value})
        onSubmit(query)
}}>

 <h2>SEARCH CARDS BY TYPE</h2>

 <a href="" onClick={event => {
            event.preventDefault()
            onToBack()
        }}>GO BACK</a>

        <input type = "radio" name = "hero" value = "Hero"></input>Hero
        <input type = "radio" name = "minion" value = "Minion"></input>Minion
        <input type = "radio" name = "spell" value = "Spell"></input>Spell
        <input type = "radio" name = "enchantment" value = "Enchantment"></input>Enchantment
        <input type = "radio" name = "weapon" value = "Weapon"></input>Weapon
        <input type = "radio" name = "hero power" value = "Hero power"></input>Hero power

        Mana Cost: <input className="mana-cost" type="number" name="manacost" min="-1" max="10" />
        Attack: <input className="mana-cost" type="number" name="attack" min="-1" max="100" />
        Durability: <input className="mana-cost" type="number" name="durability" min="-1" max="100" />
        Health: <input className="mana-cost" type="number" name="health" min="-1" max="100" />

        <button>SEARCH</button>
    </form>
}

=======
        let query = querySet('type', event.target.type.value, {})
}}>




    </form>
}


{/* <button class="filter">By Type</button>
<form class="by-type">
    <input type="checkbox" name="hero" value="Hero">Hero
    <input type="checkbox" name="minion" value="Minion">Minion
    <input type="checkbox" name="spell" value="Spell">Spell
    <input type="checkbox" name="enchantment" value="Enchantment">Enchantment
    <input type="checkbox" name="weapon" value="Weapon">Weapon
    <input type="checkbox" name="hero power" value="Hero Power">Hero Power
</form> */}
>>>>>>> hearthstone-develop
