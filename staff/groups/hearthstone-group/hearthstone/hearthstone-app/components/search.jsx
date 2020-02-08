function Search({onSubmit}) {
    return <form className="search" onSubmit={event => {
        event.preventDefault()
        onSubmit()
    }}>
        <h2>SEARCH CARDS</h2>
        <input className="browser" type="text" name="browser" placeholder="Type here to search of a card"/>
            <br/>
            Mana Cost: <input className="mana-cost" type="number" name="age" min="0" max="10" />
            <br />
            <button className="accordion">By Class</button>
            <div className='container-filters'>
                <input type="checkbox" name = "Druid" value ="Druid"  />Druid
                <input type="checkbox" name = "Hunter" value ="Hunter" />Hunter
                <input type="checkbox" name = "Mage" value ="Mage" />Mage
                <input type="checkbox" name = "Paladin" value ="Paladin" />Paladin
                <input type="checkbox" name = "Priest" value ="Priest" />Priest
                <input type="checkbox" name = "Rogue" value ="Rogue" />Rogue
                <input type="checkbox" name = "Shaman" value ="Shaman" />Shaman
                <input type="checkbox" name = "Warlock" value ="Warlock" />Warlock
                <input type="checkbox" name = "Warrior" value ="Warrior" />Warrior
                <input type="checkbox" name = "Dream" value ="Dream" />Dream
            </div>
            <button className="accordion">By Race</button>
            <div className='container-filters'>
                <input type="checkbox" name = "Demon" value ="Demon" />Demon
                <input type="checkbox" name = "Dragon" value ="Dragon" />Dragon
                <input type="checkbox" name = "Mech" value ="Mech" />Mech
                <input type="checkbox" name = "Murloc" value ="Murloc" />Murloc
                <input type="checkbox" name = "Beast" value ="Beast" />Beast
                <input type="checkbox" name = "Pirate" value ="Pirate" />Pirate
                <input type="checkbox" name = "Totem" value ="Totem" />Totem
            </div>
            <button className="accordion">By Faction</button>
            <div className="container-filters">
                <input type="checkbox" name="horde" value="Horde" />Horde
                <input type="checkbox" name="alliance" value="Alliance" />Alliance
                <input type="checkbox" name="neutral" value="Neutral" />Neutral
            </div>
            <button className="accordion">By Quality</button>
            <div className="container-filters">
                <input type="checkbox" name="basic" value="Basic" />Basic
                <input type="checkbox" name="common" value="Common" />Common
                <input type="checkbox" name="rare" value="Rare" />Rare
                <input type="checkbox" name="epic" value="Epic" />Epic
                <input type="checkbox" name="legendary" value="Legendary" />Legendary
            </div>
            <button className="accordion">By Type</button>
            <div className="container-filters">
                <input type="checkbox" name="hero" value="Hero" />Hero
                <input type="checkbox" name="minion" value="Minion" />Minion
                <input type="checkbox" name="spell" value="Spell" />Spell
                <input type="checkbox" name="enchantment" value="Enchantment" />Enchantment
                <input type="checkbox" name="weapon" value="Weapon" />Weapon
                <input type="checkbox" name="hero power" value="Hero Power"/>Hero Power
            </div>
    </form>
}