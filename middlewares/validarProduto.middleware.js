module.exports = (req, res, next) => {

const {nome, preco, quantidade} = req.body

if (!nome || preco === undefined || quantidade === undefined){

    return res.status(400).json({
        erro: "Nome, preço e quantidade são campos obrigatórios"
})
}

if(nome.trim().length <3){
return res.status(400).json({
    erro: "O nome deve conter pelo menos 3 caracteres"
})
}

if (isNaN(preco)|| preco <= 0){
return res.status(400).json({
    erro: "preço invalido"
})
}

if(!Number.isInteger(quantidade) || quantidade < 0){
return res.status(400).json({
    erro: "quantidade invalida"
})
}

next();
}