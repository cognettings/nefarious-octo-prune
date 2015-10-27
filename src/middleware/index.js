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
  if (req.headers['x-forwarded-proto'] != 'https') {
    console.log('Connection is not secure, redirecting to a secure connection.');
    console.log('Value of "x-forwarded-proto" was: ' + req.headers['x-forwarded-proto']);
    return res.redirect('https://' + req.host + req.url);
  }

  console.log('Secure connection established.');
  next();
}

function bypassSecure(req, res, next) {
  console.log('Bypassing the secured requirement');
  next();
}

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

console.log('Environment is ' + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  console.log('A secure connection is required');
  module.exports.requiresSecure = requiresSecure;
}
else {
  console.log('No need for a secure connection.');
  module.exports.requiresSecure = bypassSecure;
}
