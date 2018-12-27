import { API_ROOT } from './constants/API';

import BaseAPI from './BaseAPI';

const API = new BaseAPI(API_ROOT);
const promiseList1 = [];

function updateStatus() {
  status.innerText = promiseList1.map((status) => status.status).join(', ');
}

const buttonElement = document.getElementById('button-request-1');
const status = document.getElementById('status-1');
const cancelButtonElement = document.getElementById('button-cancel-all-1');
console.log(status);
buttonElement.addEventListener('click', () => {
  const promise = API.fetch();

  // ステータスをログとして持っておく
  const statusObj = {
    status: 'pending'
  };
  promiseList1.push(statusObj);
  promise
    .then(() => { statusObj.status = 'success'; })
    .catch(({ isCancel }) => { statusObj.status = isCancel ? 'cancel' : 'error'; });
  console.log(promiseList1);

  updateStatus();
  promise
    .then((response) => {
      console.log(response);
    })
    .catch(({ isCancel, err }) => {
      console.log(isCancel, err);
    })
    .finally(() => {
      updateStatus();
    });
});

cancelButtonElement.addEventListener('click', () => {
  API.cancelAll();
});
console.log(API);
