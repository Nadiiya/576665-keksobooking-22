const GET_DATA_LINK = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_LINK = 'https://22.javascript.pages.academy/keksobooking';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  const {statusText, status} = response;
  throw new Error(`${status} — ${statusText}`);
}

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_LINK)
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
    SEND_DATA_LINK,
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
