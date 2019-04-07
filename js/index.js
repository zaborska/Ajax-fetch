document.querySelector('.page-loaded')
  .innerText = new Date().toLocaleTimeString();

document.querySelector('.get-html-ajax')
  .addEventListener('click', getHtmlAjax);

const READY_STATE_FINISHED = 4;
const HTTP_STATUS_CODE_OK = 200;

function getHtmlAjax() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === READY_STATE_FINISHED
      && xhr.status == HTTP_STATUS_CODE_OK) {
      document.querySelector('.html-placeholder')
        .innerHTML = xhr.responseText;
    }
  }
  xhr.open('GET', 'client-data.html', true);
  xhr.send();
}

document.querySelector('.fetch-html')
  .addEventListener('click', fetchHtml);

function fetchHtml() {
  fetch('client-data.html')
    .then(response => response.text())
    .then(html => document.querySelector('.html-placeholder').innerHTML = html)
    .catch(error => document.querySelector('.html-placeholder').innerHTML = error.message);
}


document.querySelector('.get-json-ajax')
  .addEventListener('click', getJsonAjax);

function getJsonAjax() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === READY_STATE_FINISHED
      && xhr.status == HTTP_STATUS_CODE_OK) {
      const clientData = JSON.parse(xhr.responseText);
      document.querySelector('.client-name')
        .innerText = clientData.name;
      document.querySelector('.account-balance')
        .innerText = clientData.balance;
    }
  }
  xhr.open('GET', 'client-data.json', true);
  xhr.send();
}

document.querySelector('.fetch-json')
  .addEventListener('click', fetchJSON);

function fetchJSON() {
  fetch('client-data.json')
    .then(response => response.json())
    .then(clientData => {
      document.querySelector('.client-name')
        .innerText = clientData.name;
      document.querySelector('.account-balance')
        .innerText = clientData.balance;
    });
}

document.querySelector('.curr-convert')
  .addEventListener('click', currConvert);

function currConvert(e) {
  e.preventDefault();
  const currFrom = document.querySelector('.converter input[name=curr-from]').value;
  const currTo = document.querySelector('.converter input[name=curr-to]').value;
  const currKey = currFrom + '_' + currTo;
  fetch(`https://free.currencyconverterapi.com/api/v6/convert?q=${currKey}&compact=ultra&apiKey=d1b5218e0be93e157106`)
    .then(response => response.json())
    .then(currency => {
      const rate = currency[currKey];
      const sourceAmount = document.querySelector('.converter input[name=curr-amount]').value;
      const convertedAmount = rate * sourceAmount;
      document.querySelector('.converter output[name=curr-converted]')
        .innerText = convertedAmount.toFixed(2);
    });
}

document.querySelector('.login-form').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  fetch('form.php', {
    method: 'POST',
    body: new FormData(document.querySelector('.login-form'))
  })
    .then(response => response.text())
    .then(html => document.querySelector('.server-response')
      .innerHTML = html);
}


