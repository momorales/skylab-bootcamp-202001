function querySet(type, value, obj) {
    let query = `${type}/${value}?`

    const keys = obj
    const keyEval = Object.keys(keys)

    for (let i = 0; i < keyEval.length; i++) {
        const key = keyEval[i]

        if (keys[key] !== '') {
            query += `${key}=${keys[key]}`
            if (i < keyEval.length -1) query += '&'
        }

    }

    return query
}