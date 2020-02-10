function SearchByClass (onSubmit, onToBack){
    return <form className="by-class" onSubmit={event =>{
            event.preventDefault()
            
            let query = querySet('classes',event.target.classes.value,{health: event.target.health.value,durability:event.target.durability.value,cost: event.target.cost.value,attack: event.target.attack.value})
            onSubmit(query)
    }}>
            <h2>SEARCH CARDS BY CLASS</h2>

            <a href="" onClick={event=>{
                event.preventDefault()
                onToBack()
            }}>GO BACK</a>

                <input type="radio" name = "Druid" value ="Druid" />Druid
                <input type="radio" name = "Hunter" value ="Hunter"/>Hunter
                <input type="radio" name = "Mage" value ="Mage"/>Mage
                <input type="radio" name = "Paladin" value ="Paladin"/>Paladin
                <input type="radio" name = "Priest" value ="Priest"/>Priest
                <input type="radio" name = "Rogue" value ="Rogue"/>Rogue
                <input type="radio" name = "Shaman" value ="Shaman"/>Shaman
                <input type="radio" name = "Warlock" value ="Warlock"/>Warlock
                <input type="radio" name = "Warrior" value ="Warrior"/>Warrior
                <input type="radio" name = "Dream" value ="Dream"/>Dream
        
        Mana Cost: <input className="mana-cost" type="number" name="manacost" min="-1" max="10" />
        Attack: <input className="mana-cost" type="number" name="attack" min="-1" max="100" />
        Durability: <input className="mana-cost" type="number" name="durability" min="-1" max="100" />
        Health: <input className="mana-cost" type="number" name="health" min="-1" max="100" />

        <button>SEARCH</button>

        </form>

}


{/* <h2>Search</h2>
            <input type="text" name="browser" placeholder="Type here to search of a card">
            <button class="filter">By Class</button>
            <form class = 'container-filters'>
                <input type="checkbox" name = "Druid" value ="Druid" >Druid
                <input type="checkbox" name = "Hunter" value ="Hunter">Hunter
                <input type="checkbox" name = "Mage" value ="Mage">Mage
                <input type="checkbox" name = "Paladin" value ="Paladin">Paladin
                <input type="checkbox" name = "Priest" value ="Priest">Priest
                <input type="checkbox" name = "Rogue" value ="Rogue">Rogue
                <input type="checkbox" name = "Shaman" value ="Shaman">Shaman
                <input type="checkbox" name = "Warlock" value ="Warlock">Warlock
                <input type="checkbox" name = "Warrior" value ="Warrior">Warrior
                <input type="checkbox" name = "Dream" value ="Dream">Dream
            </form> */}