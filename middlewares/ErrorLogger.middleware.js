const fs = require("fs");
const path = require("path");

const errorLogger = (err, req, res, next) => {

    const logPath = path.join(__dirname, "../logs/error.log");

    const errorMessage = `
[${new Date().toISOString()}]
Método: ${req.method}
Rota: ${req.originalUrl}
Erro: ${err.message}

`;

    fs.appendFileSync(logPath, errorMessage);

    console.error(err);

    return res.status(500).json({
        error: "Erro interno do servidor"
    });
};

module.exports = errorLogger;