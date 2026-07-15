const { Router } = require("express");
const ProdutosController = require("./controllers/ProdutoController");
const HelmetMiddleware = require("../middlewares/Helmet.middleware");
const validarProduto = require("../middlewares/validarProduto.middleware"); 

const routes = Router();
routes.use(HelmetMiddleware());

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});


routes.get("/produtos",ProdutosController.index);
routes.post("/produtos",validarProduto,ProdutosController.store);
routes.put("/produtos/:id",validarProduto,ProdutosController.update);
routes.delete("/produtos/:id", ProdutosController.destroy);
routes.get("/produtos/:id", ProdutosController.show);



module.exports = routes;
