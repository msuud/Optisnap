const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes');
module.exports =  (req, res, next) => {
    // console.log(req.headers);
    try {
      let token = req.cookies.accessToken;
      if (token == null) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
        }  else {
          req.user = user;
          // console.log("user",user);
          next();
        }
      });
    } catch (error) {
      console.log(error);
      return res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  };
