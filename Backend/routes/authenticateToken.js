const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes');
module.exports =  (req, res, next) => {
    // console.log(req.headers);
    let token = req.headers.authorization;
    if (token == null) {
      return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
      }  else {
        req.user = user;
        next();
      }
    });
  };