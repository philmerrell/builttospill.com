// CloudFront Function (cloudfront-js-2.0), viewer-request.
//
// The site is plain files in a private S3 bucket, so CloudFront has to do what a
// web server would:
//   /music/                       -> serve /music/index.html
//   /music                        -> 301 to /music/   (one canonical URL per page)
//   /home, /home/                 -> 301 to /         (the old app's home route)
//   builttospill.com/anything     -> 301 to https://www.builttospill.com/anything
// Anything with a file extension passes straight through. A request that needs
// more than one of these fixes still gets a single redirect.

var CANONICAL_HOST = 'www.builttospill.com';
// Other names the distribution answers to. They only ever redirect.
var REDIRECT_HOSTS = ['builttospill.com'];

function query(qs) {
  var parts = [];
  for (var key in qs) {
    var entry = qs[key];
    var values = entry.multiValue ? entry.multiValue : [entry];
    for (var i = 0; i < values.length; i++) {
      parts.push(values[i].value === '' ? key : key + '=' + values[i].value);
    }
  }
  return parts.length ? '?' + parts.join('&') : '';
}

function redirect(location, request) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: { value: location + query(request.querystring || {}) },
      'cache-control': { value: 'public, max-age=3600' },
    },
  };
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var host = request.headers && request.headers.host ? request.headers.host.value.toLowerCase() : '';

  // Where this page really lives.
  var path = uri;
  if (uri === '/home' || uri === '/home/') {
    path = '/';
  } else if (!uri.endsWith('/')) {
    var leaf = uri.substring(uri.lastIndexOf('/') + 1);
    if (leaf.indexOf('.') === -1) path = uri + '/';
  }

  if (REDIRECT_HOSTS.indexOf(host) !== -1) {
    return redirect('https://' + CANONICAL_HOST + path, request);
  }
  if (path !== uri) {
    return redirect(path, request);
  }

  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  }
  return request;
}
