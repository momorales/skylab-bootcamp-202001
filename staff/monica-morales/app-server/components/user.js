module.exports = function(props ={}){
    const {name ='Anonymous', username} = props

    return `<section>
    <h1>Welcome, ${name} </h1> ${username ? `<form action ="/logout" method ="post"><input type="hidden" value="${surname}" name="usrname"><button>Logout</button></form>` :''}
    </section>`
}