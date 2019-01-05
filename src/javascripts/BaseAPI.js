import CancelableAPI from '../../lib/CancelableAPI';

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
