const validationQuery = (obj) => {
    //if(!obj) return undefined;
    for(let prop in obj) {
        if(prop === 'name' || prop === 'summary' || prop === 'diet' || prop === 'healthScore' ) (obj[prop])
        else throw ('El parametro ingresado para la busqueda no es correcto')
    }
}

const validationBody = (obj) => {
    const { name,
        imageUrl,
        summary } = obj;
    if(!name || !imageUrl || !summary) throw new Error('Falta enviar datos obligatorios');
    return
}
module.exports = {
validationQuery,
validationBody
}