import axios from 'axios';
import urlJoin from 'url-join';
import PCancelable from 'p-cancelable';

// APIメソッド
export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const DELETE = 'delete';

/**
 * API通信をする
 * @param {string} apiRoot - APIルート
 * @param {Object} options - APIオプション
 * @param {string} options.method - 通信メソッド名
 * @param {string} options.endpoint - 通信先
 * @param {Object?} options.query - 通信につけるクエリ
 * @param {Object?} options.header - 通信につけるヘッダー
 * @param {number?} options.timeout - 通信のタイムアウト
 * @param {Object} callbacks - コールバック関数群
 * @param {function?} callbacks.onRequestStart - リクエスト開始時のコールバック
 * @param {function?} callbacks.onSuccess - 成功時のコールバック
 * @param {function?} callbacks.onFailure - 失敗時のコールバック
 * @param {function?} callbacks.onCancel - キャンセル時のコールバック
 * @param {function?} callbacks.onRequestEnd - リクエスト終了時のコールバック
 * @returns {PCancelable} - キャンセル可能なPromise
 */
export function request(apiRoot, options, callbacks = {}) {
  const {
    method,
    endpoint,
    query = {},
    timeout = 15000
  } = options;
  const headers = {
    ...options.headers
  };

  const url = urlJoin(apiRoot, endpoint);

  // axiosでキャンセルするためにsourceを作る
  const source = axios.CancelToken.source();

  return new PCancelable((resolve, reject, onCancel) => {
    // リクエスト開始コールバックを呼ぶ
    callbacks.onRequestStart && callbacks.onRequestStart({ method, url });

    // requestのパラメータを生成する
    const requestOptions = {
      method,
      url,
      headers,
      timeout,
      cancelToken: source.token
    };
    requestOptions[method === GET ? 'params' : 'data'] = query;

    // リクエストの生成
    axios(requestOptions)
      .then((res) => {
        // リクエスト成功コールバックを呼ぶ
        callbacks.onSuccess && callbacks.onSuccess({ method, url }, res);
        resolve(res);
      })
      .catch((err) => {
        // キャンセルされた時のエラーは何もしない（onCancel側で処理を書く)
        if (axios.isCancel(err)) {
          return;
        }
        // リクエスト失敗コールバックを呼ぶ
        callbacks.onFailure && callbacks.onFailure({ method, url }, err);
        reject({
          isCancel: false,
          err
        });
      })
      .finally(() => {
        // リクエスト終了コールバックを呼ぶ
        callbacks.onRequestEnd && callbacks.onRequestEnd({ method, url });
      });

    // キャンセルを実行した時
    onCancel(() => {
      // キャンセルコールバックを呼ぶ
      callbacks.onCancel && callbacks.onCancel({ method, url });
      // 通信をキャンセルする
      source.cancel();
      reject({
        isCancel: true
      });
    });
  });
}
