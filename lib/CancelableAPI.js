import { request, GET, POST, PUT, DELETE } from './request';

// APIインスタンスリスト
const APIs = [];

/**
 * API通信のベースとなるクラス
 */
class BaseAPI {
  // HTTPメソッド
  static GET = GET;
  static POST = POST;
  static PUT = PUT;
  static DELETE = DELETE;

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
   * @param {Object} callbacks - コールバック関数群
   * @param {function?} callbacks.onRequestStart - リクエスト開始時のコールバック
   * @param {function?} callbacks.onSuccess - 成功時のコールバック
   * @param {function?} callbacks.onFailure - 失敗時のコールバック
   * @param {function?} callbacks.onCancel - キャンセル時のコールバック
   * @param {function?} callbacks.onRequestEnd - リクエスト終了時のコールバック
   * @returns {PCancelable} - キャンセル可能なPromise
   */
  request(requestOptions, callbacks = {}) {
    // pCancelableリストに登録する
    const pCancelable = request(this.apiRoot, requestOptions, callbacks);
    this.pCancelableList.push(pCancelable);

    pCancelable
      // catchしないとエラーメッセージが出てくるので受け取っておく
      .catch(() => {})
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
