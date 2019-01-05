import { API_ROOT } from './constants/API';

import BaseAPI from './BaseAPI';

// API1の設定
{
  const API = new BaseAPI(API_ROOT);
  const promiseList = [];

  const statusElement = document.getElementById('status-1');
  const updateStatus = () => {
    statusElement.innerText = promiseList.map((status) => status.status).join(', ');
  };

  const buttonElement = document.getElementById('button-request-1');
  buttonElement.addEventListener('click', () => {
    const promise = API.fetch();

    // ステータスをログとして持っておく
    const statusObj = {
      status: 'pending'
    };
    promiseList.push(statusObj);
    promise
      .then(() => { statusObj.status = 'success'; })
      .catch(({ isCancel }) => { statusObj.status = isCancel ? 'cancel' : 'error'; })
      .finally(() => {
        updateStatus();
      });

    updateStatus();
  });

  const cancelButtonElement = document.getElementById('button-cancel-all-1');
  cancelButtonElement.addEventListener('click', () => {
    API.cancelAll();
  });
}

// API2の設定
{
  const API = new BaseAPI(API_ROOT);
  const promiseList = [];

  const statusElement = document.getElementById('status-2');
  const updateStatus = () => {
    statusElement.innerText = promiseList.map((status) => status.status).join(', ');
  };

  const buttonElement = document.getElementById('button-request-2');
  buttonElement.addEventListener('click', () => {
    const promise = API.fetch();

    // ステータスをログとして持っておく
    const statusObj = {
      status: 'pending'
    };
    promiseList.push(statusObj);
    promise
      .then(() => { statusObj.status = 'success'; })
      .catch(({ isCancel }) => { statusObj.status = isCancel ? 'cancel' : 'error'; })
      .finally(() => {
        updateStatus();
      });

    updateStatus();
  });

  const cancelButtonElement = document.getElementById('button-cancel-all-2');
  cancelButtonElement.addEventListener('click', () => {
    API.cancelAll();
  });
}

// 全てのAPIをキャンセルする
document.getElementById('button-cancel-all').addEventListener('click', () => {
  BaseAPI.cancelAll();
});
