let connectionCounter = 0;
let loading = false;

function get(url) {

  loading = true;
  setSpinner(true);
  connectionCounter++;

  return fetchJsonp(url)
    .then(response => {
    connectionCounter--;
    loading = connectionCounter !== 0;
    setSpinner(loading);
    return Promise.resolve(response);
  }, response => {
    connectionCounter--;
    loading = connectionCounter !== 0;
    setSpinner(loading);
    return Promise.reject(response);
  });
}

function setSpinner(show) {
  if (show) {
    document.getElementById('loading-spinner').style.display = 'block'
  } else {
    document.getElementById('loading-spinner').style.display = 'none';
  }
}
