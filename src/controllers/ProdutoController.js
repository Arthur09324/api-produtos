const {produto} = require("../models")
const { Op } = require("sequelize")

class ProdutoController {
   
    async index (req, res){

    try{
        const page = Number(req.query.page) || 1;
        const limit = 5
        const offset = (page-1)*limit;
        const {nome}=req.query
        let where = {};
    

        if (nome) {
        where = {
        nome: {
        [Op.like]: `%${nome}%`
        }}}

        const produtos = await produto.findAll({
        limit,
        offset,
        where,
        order: [["nome", "ASC"]]
    });
        return res.status(200).json({pagina: page, produtos, quantidade: produtos.length});

        }catch (error){

            return res.status(500).json({
                erro: "Erro ao buscar produtos.",
                detalhe: error.message})
            }}          
    

 async show(req, res){ 
 
    try { 
        const { id } = req.params; 
 
        const produtoEncontrado = await produto.findByPk(id); 
  
        if (!produtoEncontrado) { 
            return res.status(404).json({ 
                erro: "Produto não encontrado." 
            }); 
        } 
        return res.status(200).json(produtoEncontrado);
    } catch (error) { 
 
        return res.status(500).json({ 
            erro: "Erro interno do servidor.", 
            detalhe: error.message 
        }); 
    }}

    async store (req, res){

        try { 
  
        const { nome, preco, quantidade } = req.body; 
  
        if (!nome || preco === undefined || quantidade === undefined) { 
            return res.status(400).json({ 
                erro: "Nome, preço e quantidade são obrigatórios." 
            }); 
        } 
  
        if (nome.trim().length < 3) { 
            return res.status(400).json({ 
                erro: "O nome deve possuir pelo menos 3 caracteres." 
            }); 
        } 
  
        if (isNaN(preco) || preco <= 0) { 
            return res.status(400).json({ 
                erro: "O preço deve ser um número maior que zero." 
            }); 
        }   
  
        if (!Number.isInteger(Number(quantidade)) || quantidade < 0) { 
            return res.status(400).json({ 
                erro: "A quantidade deve ser um número inteiro maior ou igual a zero." 
            }); 
        } 
  
        const createdProduto = await produto.create({ 
            nome, 
            preco, 
            quantidade 
        }); 
  
        return res.status(201).json(createdProduto); 
 
    } catch (error) { 
 
        return res.status(500).json({erro: "Erro ao cadastrar produto."}); 
}}

    async update (req, res){
   try { 
 
        const { id } = req.params; 
 
        const { nome, preco, quantidade } = req.body; 

        const produtoExiste = await produto.findByPk(id); 
 
        if (!produtoExiste) { 
            return res.status(404).json({ 
                erro: "Produto não encontrado." 
            }); 
        } 
  
        if (!nome || preco === undefined || quantidade === undefined) { 
            return res.status(400).json({ 
                erro: "Nome, preço e quantidade são obrigatórios." 
            }); 
        } 

        if (!nome.trim()) { 
            return res.status(400).json({ 
                erro: "Nome inválido." 
            }); 
        } 
  
        if (isNaN(preco) || preco <= 0) { 
            return res.status(400).json({ 
                erro: "Preço inválido." 
            }); 
        } 
 

        if (!Number.isInteger(Number(quantidade)) || quantidade < 0) { 
            return res.status(400).json({ 
                erro: "Quantidade inválida." 
            }); 
        } 

        await produto.update( 
            { 
                nome, 
                preco, 
                quantidade 
            }, 
            { 
                where: { id } 
            } 
        ); 
  
        return res.status(200).json({ 
            mensagem: "Produto atualizado com sucesso." 
        }); 
 
    } catch (error) { 
 
        return res.status(500).json({ 
            erro: "Erro interno do servidor.", 
            detalhe: error.message 
        }); 
 
    } 
   
} 

    async destroy (req, res){
    try { 

        const { id } = req.params; 

        if (!id) { 
            return res.status(400).json({ 
                erro: "ID não informado." 
            }); 
        } 

        const produtoExiste = await produto.findByPk(id); 
 
        if (!produtoExiste) { 
            return res.status(404).json({ 
                erro: "Produto não encontrado." 
            }); 
        } 

        await produto.destroy({ 
            where: { id } 
        }); 

        console.log( 
            `Produto ${produtoExiste.nome} excluído em ${new Date()}` 
        ); 
 
        return res.status(200).json({ 
            mensagem: "Produto excluído com sucesso." 
        }); 
 
    } catch (error) { 
 
        return res.status(500).json({ 
            erro: "Erro interno do servidor.", 
            detalhe: error.message 
        }); 
 
    } 
}};


module.exports = new ProdutoController();