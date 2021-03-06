# キャンセル可能API
promiseは普通thenとcatchでresolveやrejectしたものしか受け取れないが、p-cancelableを使うとcancelメソッドが追加される。  
これを使って、promise.cancel()を実行した時に通信をキャンセルすることができるキャンセル可能なAPIクラスを作成した。  

## インストール
`$ yarn add TakanoriOnuma/cancelable-api`

## 使い方
CancelableAPIを継承して通信APIを定義する。

```js:API.js
// API.js
import CancelableAPI from 'cancelable-api';

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
      // 各イベントをフックする
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
      endpoint: '/url'
    });
  }
}

// ドメインを設定してAPIインスタンスを生成する
export default new API('http://localhost:8080');
```

後はAPIインスタンス経由で通信を呼ぶ。

```js
import API from 'API.js';

const pCancelable = API.fetch();

pCancelable
  .then((response) => {
    console.log(response);
  })
  .catch(({ isCancel, err }) => {
    if (isCancel) {
      console.log('canceled.');
      return;
    }
    console.error(err);
  });

// 1秒後に通信をキャンセルする
window.setTimeout(() => {
  pCancelable.cancel();
}, 1000);
```

まとめてキャンセルする場合は`.cancelAll`を使用する。

```js
// APIインスタンスでリクエスト中の通信を全てキャンセルする
API.cancelAll();

// CancelableAPIを継承して通信しているもの全てをキャンセルする
CancelableAPI.cancelAll();
```

## ローカルで動作確認
このリポジトリでサンプルコードを動かすには以下の手順を踏む。  

まずパッケージをインストールする。  
`$ yarn install`  

次にフロントエンドの開発サーバーとモックサーバーを立ち上げる。  
`$ yarn start`  
`$ yarn mock`  

[http://localhost:10000](http://localhost:10000)にアクセスして動作を確認する。

## サンプル
以下のリポジトリでもこのパッケージを使ったサンプルコードがあるので適宜参照すること。

+ [Vue.jsでcancelable-apiを使ったサンプルリポジトリ](https://github.com/TakanoriOnuma/use-cancelable-api)

## dependencies
+ [p-cancelable](https://github.com/sindresorhus/p-cancelable)
+ [axios](https://github.com/axios/axios)
+ [url-join](https://github.com/jfromaniello/url-join)
