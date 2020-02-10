function SearchByType({onSubmit, onToBack}){
    return <form className = "by-type" onSubmit ={event => {
        event.preventDefault()
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