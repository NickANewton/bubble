const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const token = req.get('X-Access-Token');
  if (!token) {
    throw new ClientError(401, 'authentication required');
  } else {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  }
}

module.exports = authorizationMiddleware;
