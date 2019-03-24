(function (w, d, u, i, s) {
  if (w[i]) {
    return w[i]();
  }
  s = d.getElementById(i);
  if (s) {
    return;
  }
  s = d.createElement('script');
  s.src = u;
  s.id = i;
  d.body.appendChild(s);
})(window, document, '<JS_URL>', '<SCRIPT_ID>');
