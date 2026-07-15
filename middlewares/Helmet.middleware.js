const helmet = require('helmet');

const helmetMiddleware = () => {
    return helmet({

        hsts: {
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            includeSubDomains: true,
            preload: true
        },

        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],

                imgSrc: ["'self'", "data:"]
            }
        },
        referrerPolicy: {
            policy: 'no-referrer'
        },
        hidePoweredBy: true
    });
};

module.exports = helmetMiddleware;