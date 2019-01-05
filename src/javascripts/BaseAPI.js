// ビルド前のモジュール
// import CancelableAPI from '../../lib/CancelableAPI';
// ビルド後のモジュール
import CancelableAPI from '../../lib-dist/index';

class API extends CancelableAPI {
  fetch() {
    console.log('request');
    return this.request({
      method: CancelableAPI.GET,
      endpoint: '/data'
    });
  }
}

export default API;
