function requiresLogin(req, res, next) {
  if (!req.session.account) {
    return res.redirect('/');
  }

  next();
}

function requiresLogout(req, res, next) {
  if (req.session.account) {
    return res.redirect('/maker');
  }

  next();
}

function requiresSecure(req, res, next) {
  console.log(req.headers['x-forwarded-proto']);
  if (req.headers['x-forwarded-proto'] != 'https') {
    return res.redirect('https://' + req.host + req.url);
  }

  next();
}

function bypassSecure(req, res, next) {
  next();
}

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
}
else {
  module.exports.requiresSecure = bypassSecure;
}
