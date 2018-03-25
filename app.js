var app = require('connect')();
app.use(require('serve-static')(__dirname));
app.listen(80);
