import CancelableAPI from '../../lib/CancelableAPI';
import lib from '../../lib-dist/index';

console.log(lib);
CancelableAPI.GET;

class API extends lib {
  fetch() {
    console.log('request');
    return this.request({
      method: lib.GET,
      endpoint: '/data'
    });
  }
}

export default API;
