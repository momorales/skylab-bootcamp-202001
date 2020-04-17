import context from './context'
export default (function () {
    return (async () => {
        return this.token
    })()
}).bind(context)