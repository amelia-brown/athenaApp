'use strict'
const text = require('./config/loadText.js');
const mw = require('./config/middleware.js');
const chalk = mw.chalk;
const urls = mw.urls;
const PING_FREQUENCY = 60000;

//set port to default port or POST variable provided by user

const port = process.argv[2] || urls.default;

//load art
console.log(text.art);

//check downstream servers
function serverCheck() {
  console.log('\n' + new Date);
  [
    ['KB', urls.kb],
    ['Ticket', urls.ticket],
    ['User', urls.user],
    ['KB Search', urls.kbSearch]
  ].forEach((host) => {
      let start = Date.now();
      mw.request.get(host[1])
        .on('error', err => serverLog(host, err))
        .on('response', res => {
          serverLog(host, undefined, res, Date.now() - start)
          res.on('data', data => {
            data = JSON.parse(data);
            console.log(
            ` ${res.statusCode === 200 ?
              chalk.green.bold(String.fromCharCode(0x27A0)) + chalk.green(` ${data}!`)
              : chalk.yellow(String.fromCharCode(0x27A0)) + '  ' + chalk.red.underline('Database Error') + chalk.red(': ' + data.message + ' (' + data.name + ').')
            }`);
        });
      })
  });
}

//check server status every minute
setInterval(serverCheck, PING_FREQUENCY);

//set server to listen to port
require('./server.js').listen(port, () => {
  console.log(chalk.green.bold(`Athena App RESTful API listening on port ${port}.`))
  serverCheck();
});


//server checker helper function
function serverLog(host, err, res, diff) {
  let test = '';
  for(let key in res)
    test += key + ' ';
  console.log(
  `${err ?
    chalk.red.bold(String.fromCharCode(0x2716), err)
    : chalk.green.bold(String.fromCharCode(0x2714))} ${chalk.cyan.bold(`${host[0]} Server`)} <${chalk.white.bold(`${host[1]}`)}> is ${err ?
        chalk.red.bold('offline')
        : `${chalk.green.bold('online')} ${chalk.cyan(String.fromCharCode(0x21e8))} responded in ${
            (() => diff < 500 ?
                diff < 100 ?
                  chalk.green.bold(diff)
                  : chalk.yellow.bold(diff)
                : chalk.red.bold(diff)
            )()
          } ms`
      }.`
  );
}
