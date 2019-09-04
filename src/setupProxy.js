const proxy = require('http-proxy-middleware');

const proxyMiddleware = proxy({ target: 'http://localhost:4000/' });

module.exports = function(app) {
    /*app.use('/api/file', (req, res) => {
        console.log(req.path);
        res.redirect(`http://localhost:4000/api/file${req.path}`);
    });*/
    app.use('/api', proxyMiddleware);
};