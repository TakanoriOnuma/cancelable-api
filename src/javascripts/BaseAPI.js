// ビルド前のモジュール
// import CancelableAPI from '../../lib/CancelableAPI';
// ビルド後のモジュール
import CancelableAPI from '../../lib-dist/bundle.min.js';

class API extends CancelableAPI {
  /**
   * API通信をする
   * @param {Object} requestOptions - リクエストオプション
   * @param {string} requestOptions.method - 通信メソッド名
   * @param {string} requestOptions.endpoint - 通信先
   * @param {Object?} requestOptions.query - 通信につけるクエリ
   * @param {Object?} requestOptions.header - 通信につけるヘッダー
   * @param {number?} requestOptions.timeout - 通信のタイムアウト
   * @returns {PCancelable} - キャンセル可能なPromise
   */
  request(requestOptions) {
    return super.request(requestOptions, {
      // コールバックを定義できる
      // onRequestStart: () => { console.log('request start'); },
      // onSuccess: () => { console.log('request success'); },
      // onFailure: () => { console.log('request failure'); },
      // onCancel: () => { console.log('request cancel'); },
      // onRequestEnd: () => { console.log('request end'); }
    });
  }

  /**
   * リクエストのテスト
   * @returns {PCancelable}
   */
  fetch() {
    return this.request({
      method: CancelableAPI.GET,
      endpoint: '/data'
    });
  }
}

export default API;
