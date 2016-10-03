const mw = require('../../config/middleware.js');
const request = mw.request;
const url = mw.urls.user;

var createSession = (req, user, cb) =>
  req.session.regenerate(() => {
    req.session.user = user;
    cb && cb();
  });

function destroySession(req, cb) {
  req.session && req.session.destroy(() => cb && cb());
}

module.exports = {
  checkSession(req, res) {
    !req.session ?
      res.status(404).send("session not found")
      : !req.session.hasOwnProperty('user') ?
          res.status(401).send("session is not logged in")
          : res.status(200).send(req.session.user);
  },
  getUser(req, res) {
    var id = req.params.id;
    request({
      method: 'GET',
      uri: `${url}/api/user${id ? `/${req.params.id}` : ''}`
    }, (err, resp, body) => err ?
      res.status(err.statusCode).send(err)
      : res.status(resp.statusCode).send(JSON.parse(body))
    );
  },

  signin(req, res) {
    request({
      method: 'GET',
      uri: `${url}/api/signin/${req.params.username}/${req.params.password}`
    }, (err, resp, body) => err ?
      res.status(err.statusCode).send(err)
      : (resp.statusCode === 404 || resp.statusCode === 401) ?
          res.status(resp.statusCode).send(body)
          : (() => { //create new session for new login
              body = JSON.parse(body);
              createSession(req, { _id: body },
                () => res.status(resp.statusCode).send(body));
            })()
    );
  },
  signout(req, res) {
    destroySession(req, () => res.status(200).send('signed out'));
  },
  createUser(req, res) {
    request({
      method: 'POST',
      uri:`${url}/api/signin/${req.params.username}/${req.params.password}`,
      json: req.body
    }, (err, resp, body) => err ?
      res.status(err.statusCode).send(err)
      : (() => createSession(req, { _id: body },
          () => res.status(resp.statusCode).send(body))
        )()
    );
  },
  editUser(req, res) {
    request({
      method: 'PUT',
      uri: `${url}/api/user/${req.params.id}/${req.params.password}`,
      json: req.body
    }, (err, resp, body) => err ?
      res.status(err.statusCode).send(err)
      : (resp.statusCode === 404 || resp.statusCode === 401) ?
          res.status(resp.statusCode).send(body)
          : (() => createSession(req, { _id: body },
              () => res.status(resp.statusCode).send(body)))()
    );
  },
  deleteUser(req, res) {
    request({
      method: 'DELETE',
      uri: `${url}/api/user/${req.params.id}/${req.params.password}`
    }, (err, resp, body) => err ? 
      res.status(err.statusCode).send(err)
      : destroySession(req, ()=> res.status(resp.statusCode).send(JSON.parse(body)))
    );
  }
};
