const BASE_URL = 'https://22.javascript.pages.academy/keksobooking';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  const {statusText, status} = response;
  throw new Error(`${status} — ${statusText}`);
}

const getData = (onSuccess, onFail) => {
  fetch(`${BASE_URL}/data`)
    .then (checkStatus)
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch((error) => {
      onFail(error)
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    BASE_URL,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export {getData, sendData};
