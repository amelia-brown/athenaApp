const mw = require('./config/middleware.js');
const path = mw.path;
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require("../webpack.config.js");
var compiler = webpack(config);
//middleware
//
const isDeveloping = process.env.NODE_ENV !== 'production';
var app;
if (isDeveloping) {
  app = new WebpackDevServer(compiler, {
    hot: true
  });
} else {
  app = mw.express();
}

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
app.use(mw.express.static(path.join(__dirname, '../public')));
app.get(/^\/(?!api).*/, (req, res) => { //serve index for any route that isn't an api call
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});
module.exports = app;
