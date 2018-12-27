import axios from 'axios';
import PCancelable from 'p-cancelable';

/**
 * API通信をする
 * @param {string} apiRoot - APIルート
 * @param {Object} options - APIオプション
 * @param {string} options.method - 通信メソッド名
 * @param {string} options.endpoint - 通信先
 * @param {Object?} options.query - 通信につけるクエリ
 * @param {Object?} options.header - 通信につけるヘッダー
 * @param {number?} options.timeout - 通信のタイムアウト
 * @returns {PCancelable} - キャンセル可能なPromise
 */
function request(apiRoot, options) {
  const {
    method,
    endpoint,
    query = {},
    timeout = 15000
  } = options;
  const headers = {
    ...options.headers
  };

  const url = `${apiRoot}${endpoint}`;

  // axiosでキャンセルするためにsourceを作る
  const source = axios.CancelToken.source();

  return new PCancelable((resolve, reject, onCancel) => {
    // リクエスト中をstoreに送る(pCancelableを渡したいためここで書く)
    //store.commit(mutationTypes.REQUESTING, { method, url });

    // requestのパラメータを生成する
    const requestOptions = {
      method,
      url,
      headers,
      timeout,
      cancelToken: source.token
    };
    requestOptions[method === BaseAPI.GET ? 'params' : 'data'] = query;

    // リクエストの生成
    axios(requestOptions)
      .then((res) => {
        // リクエストに成功したことをstoreに送る
        //store.commit(mutationTypes.SUCCESS, { method, url });
        resolve(res);
      })
      .catch((err) => {
        // キャンセルされた時のエラーは何もしない（onCancel側で処理を書く)
        if (axios.isCancel(err)) {
          return;
        }
        // 通信に失敗したことをstoreに送る
        //store.commit(mutationTypes.FAILURE, { method, url });
        reject({
          isCancel: false,
          err
        });
      });

    // キャンセルを実行した時
    onCancel(() => {
      // 通信をキャンセルすることをstoreに送る
      //store.commit(mutationTypes.CANCEL, { method, url });
      // 通信をキャンセルする
      source.cancel();
      reject({
        isCancel: true
      });
    });
  });
}

// APIインスタンスリスト
const APIs = [];

/**
 * API通信のベースとなるクラス
 */
class BaseAPI {
  // HTTPメソッド
  static GET = 'get';
  static POST = 'post';
  static PUT = 'put';
  static DELETE = 'delete';

  /**
   * コンストラクタ
   * @param {string} apiRoot - APIルート
   */
  constructor(apiRoot = '') {
    // APIルート
    this.apiRoot = apiRoot;
    // 通信中のcancelable promiseリスト
    this.pCancelableList = [];
    // APIインスタンスリストに登録する
    APIs.push(this);
  }

  /**
   * APIルートの設定
   * @param {string} apiRoot - APIルート
   */
  setAPIRoot(apiRoot) {
    this.apiRoot = apiRoot;
  }

  /**
   * API通信をする
   * @param {Object} requestOptions - リクエストオプション
   * @param {string} requestOptions.method - 通信メソッド名
   * @param {string} requestOptions.endpoint - 通信先
   * @param {Object?} requestOptions.query - 通信につけるクエリ
   * @param {Object?} requestOptions.header - 通信につけるヘッダー
   * @param {number?} requestOptions.timeout - 通信のタイムアウト
   * @param {Object} additionalOptions - 追加オプション
   * @param {boolean?} additionalOptions.ignoreErrorStatusCodes - エラー時にダイアログを開かないステータスコードリスト
   * @returns {PCancelable} - キャンセル可能なPromise
   */
  request(requestOptions, additionalOptions = {}) {
    // pCancelableリストに登録する
    const pCancelable = request(this.apiRoot, requestOptions);
    this.pCancelableList.push(pCancelable);

    pCancelable
      // デフォルトのエラーダイアログを表示する
      .catch(({ isCancel, err }) => {
        // キャンセルの場合は何もしない
        if (isCancel) {
          return;
        }
        const { ignoreErrorStatusCodes = [] } = additionalOptions;
        const statusCode = err.response ? err.response.status : '--';
        console.log(ignoreErrorStatusCodes, statusCode);
        // エラーで無視していいステータスコードでない場合はダイアログを開く
        // if (ignoreErrorStatusCodes.indexOf(statusCode) === -1) {
        //   Dialog.open({
        //     title: `通信エラー (${statusCode})`,
        //     okButtonText: '閉じる'
        //   });
        // }
      })
      // Promiseが終了した時にリストから外す
      .finally(() => {
        this.pCancelableList = this.pCancelableList.filter((promise) => promise !== pCancelable);
      });

    return pCancelable;
  }

  /**
   * 一つのインスタンスで実行された通信中のものを全てキャンセルする
   */
  cancelAll() {
    this.pCancelableList.forEach((pCancelable) => {
      pCancelable.cancel();
    });

    // cancelableのリストはrequestメソッド側で外れるが、先に外してしまう
    this.pCancelableList = [];
  }

  /**
   * 静的キャンセルメソッドで、全ての通信をキャンセルする
   */
  static cancelAll() {
    APIs.forEach((API) => {
      API.cancelAll();
    });
  }
}

export default BaseAPI;
