const mw = require('./config/middleware.js');
const app = mw.express;
const path = mw.path;
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require("../webpack.config.js");
config.entry.bundle.unshift("webpack-dev-server/public?http://localhost:8080/");
const compiler = webpack(config);
var server;
const devEnv = process.env.NODE_ENV !== 'production';

//middleware
module.exports = app().use(
  mw.morgan('dev'),
  mw.bodyParser.json(),
  mw.bodyParser.urlencoded({extended: true}),
  mw.session({
    secret: 'It\'s a SECRET: bri6CMg5Te85s0790VhSVlf51T5yd086',
    saveUninitialized: false,
    resave: true,
    name: 'strix.sid',
    cookie: {secure:false}
  }),
  require('./resources/user/router.js'),
  require('./resources/ticket/router.js'),
  require('./resources/kb/router.js')
)


.get(/^\/(?!api).*/, (req, res) => { //serve index for any route that isn't an api call
  res.sendFile(path.join(__dirname, '../public', 'index.html'))});

if (!devEnv) {
  app.static(path.join(__dirname, '../public'));
} else {
  devServer = new webpackDevServer(compiler);
  devServer.listen(8080);
}

