const mw = require('./config/middleware.js');
const path = mw.path;
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require("../webpack.config.js");
config.entry.bundle.unshift("webpack/hot/dev-server", "webpack-dev-server/bundle?http://localhost:8080/");
const compiler = webpack(config);
var server;
const devEnv = process.env.NODE_ENV !== 'production';
const proxy = require('proxy-middleware');
const url = require('url');

const app = mw.express();

//middleware
app.use(
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

if (!devEnv) {
  app.static(path.join(__dirname, '../public'));
} else {
  devServer = new webpackDevServer(compiler, {
    contentBase: __dirname,
    hot: true,
    noInfo: true,
    historyApiFallback: true,
  });
  app.use('/public/', proxy(url.parse('http://localhost:8080/public/')));
  devServer.listen(8080, () => console.log('DEVSERVER LISTENING ON 8080'));
}

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public','index.html'))
});

module.exports = app;
