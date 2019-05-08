const search = document.querySelector('input');
const form = document.querySelector('form');

// where we will print the forecast messages
const forecastMessage = document.querySelector('#forecastMessage');

// add a listener on the form for the submit event, this is when we want to eventually trigger an http request to our server to fetch the weather
form.addEventListener('submit', (e) => {
  // stop the form from being submitted
  e.preventDefault();

  // need to remove any previous messages each time the user makes anothe request
  clearChildElements(forecastMessage);

  // the location the user typed in the search input
  const location = search.value;

  // pass the location along to the server and get back the forecast data or an error, should be a request to /weather?address={location}
  const data = { error: true, msg: 'Error, (details....)'};
  // const data = { error: false, msg: 'Here is your forecast for...' };

  // format a message based on the returned data and add this to the DOM
  forecastMessage.appendChild(formatMessage(data));

});

function formatMessage(data) {
  const msg = document.createElement('p');
  msg.textContent = data.msg;
  msg.className = data.error ? 'error' : 'success';
  return msg;
}

function clearChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}