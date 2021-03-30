# Vue.js
=============

## Vue読み込み
* headでCDNから呼び出す

```javascript:head
  <head>
    <meta charset="utf-8">
    <title>Vue.js Test</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
```

## Vueインスタンス

* index.html
 ```html
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <title>Vue.js Test</title>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>

<body>
  <div id="example">
    <a v-bind:href="url">テックアカデミー</a>
  </div>
</body>
</html>
```

* main.js

```javascript
const app = new Vue({
  //el： Vueの管理下に置きたいエレメント
  el: '#example',
  //data： Vueインスタンススコープ内で扱える変数
  data: {
    url: 'https://techacademy.jp/',
  },
});
```
  [オプションオブジェクト](https://qiita.com/kouki-iwahara/items/ab1bcf6e948e37fbdd8b)  ：Vueインスタンスの引数になるオブジェクト

## [ディレクティブ](https://jp.vuejs.org/v2/api/#%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96)
* v-bind：指定プロパティをdataオプションに設定した値にバインディング
  * dataオプションに設定した url プロパティがバインディング
```html
  <a v-bind:href="url">テックアカデミー</a>
```
```javascript
const app = new Vue({
  //el： Vueの管理下に置きたいエレメント
  el: '#example',
  //data： Vueインスタンススコープ内で扱える変数
  data: {
    url: 'https://techacademy.jp/',
  },
});
```

* 省略記法
```html
<div id="example">
  <input type="text" :value="name">
  <p>{{ name }}</p>
</div>
```
```javascript
const app = new Vue({
  el: '#example',
  data: {
    name: '太郎',
  },
});
```

* v-for：配列またはオブジェクトを繰り返し処理して表示できる
  * オブジェクトを繰り返し処理する場合の書き方1
```html
<ul id="example">
  <li
   v-for="member in members"
   v-bind:key="member"
  >
    {{ member }}
  </li>
</ul>
```
  * オブジェクトを繰り返し処理する場合の書き方2
```html
<ul id="example">
  <li
    v-for="(character, key) in characters"
    v-bind:key="key"
  >
    {{ key }}：{{ character }}
  </li>
</ul>
```
```html
<ul id="example">
  <li
    v-for="(character, key) in characters"
    v-bind:key="index"
  >
    {{ index }}：{{ character }}
  </li>
</ul>
```
```javascript
const app = new Vue({
  el: '#example',
  data: {
    characters: {
      hero: '桃太郎',
      friend: 'イヌ',
      enemy: '鬼',
    },
  },
});
```

* v-on：イベントを処理する
  * inputイベントが起きるたびに、name = $event.target.value という式が実行
  * イベントが発生した要素の情報は、イベントオブジェクトの target プロパティに格納
```html
<div id="example">
  <input
    v-bind:value="name"
    v-on:input="name = $event.target.value"
  >
  <p>{{ name }}</p>
</div>
```
  * 省略記法
```html
<div id="example">
  <input
    :value="name"
    @input="name = $event.target.value"
  >
  <p>{{ name }}</p>
</div>
```
```javascript
const app = new Vue({
  el: '#example',
  data: {
    name: '太郎',
  },
});
```
* v-model：v-on、v-bindの省略記法
```html
<div id="example">
  <input v-model="name">
  <p>{{ name }}</p>
</div>
```
```javascript
const app = new Vue({
  el: '#example',
  data: {
    name: '太郎',
  },
});
```

* 算出プロパティとメソッド
  * 算出プロパティ：computed 
    参照しているVueインスタンスのデータが更新されたときだけ、再計算される
  * メソッド：methods
    再描画が起きるたびに、再計算される

```html
<div id="example">
  <p>
    <button v-on:click="countUp()">{{ count }} 回</button>
  </p>
  <p>現在時刻（メソッド）： {{ getDate() }}</p>
  <p>現在時刻（算出プロパティ）： {{ date }}</p>
</div>
```
```javascript
const app = new Vue({
  el: '#example',
  data: {
    count: 0,
  },
  computed: {
    date() {
      return new Date().toLocaleString();
    },
  },
  methods: {
    countUp() {
      this.count += 1;
    },
    getDate() {
      return new Date().toLocaleString();
    },
  },
});
```
* v-show・v-ifによる表示・非表示の切り替え方法
  * v-show：スタイル属性のdisplayプロパティを操作して切り替え
  * v-if：HTMLのコードそのものを操作(非表示の場合、要素を削除)
>v-if の方が、初期表示の処理負担を軽くできます。表示する要素以外は、描画しなくて済むからです。
>しかし何度も表示・非表示を切り替える場合は、v-show の方が処理の負担を軽くできます。v-show で要素のスタイル属性を変更する処理の方が、v-if で要素そのものを追加・削除する処理より負担が軽いからです。
>そのため v-show と v-if のどちらを使うかは、切り替えの頻度を基準にします。
>頻繁に表示・非表示を切り替える場合は v-show を使い、一度表示したらほとんど切り替えない場合は v-if を使うと良いでしょう。

```html
<section class="tabs-content">
  <！-- 1番目に判定 -->
  <section v-if="activeTab === 'tabs-1'">
    <p>タブ1の内容が入ります。</p>
  </section>
  <！-- 2番目に判定 -->
  <section v-else-if="activeTab === 'tabs-2'">
    <p>タブ2の内容が入ります。</p>
  </section>
  <！-- 3番目に判定 -->
  <section v-else-if="activeTab === 'tabs-3'">
    <p>タブ3の内容が入ります。</p>
  </section>
  <！-- 上記以外の場合 -->
  <section v-else>
    <p>タブを選択してください。</p>
  </section>
</section>
```
```javascript
new Vue({
  el: '#example',
  data: {
    activeTab: '',
  },
});
```

* template要素
>HTMLのタグの1つとして定義されているものですが JavaScriptから「この要素を表示する」という命令を実行するまではブラウザに表示されない という特殊な要素

* created：中に書いた処理が「Vueインスタンスの作成直後」に実行
>[ライフサイクルフック](https://jp.vuejs.org/v2/guide/instance.html#%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%95%E3%83%83%E3%82%AF)
>「特定のタイミングで処理を行う」ことを目的に、Vueで用意されている関数

```html
<div id="example">
  <template v-if="tabs !== null">
    <ul class="tabs-menu">
      <li
        v-for="tab in tabs"
        v-bind:key="tab.id"
        v-bind:class="{active: activeTab.id === tab.id}"
        v-on:click="activeTab = tab"
      >
        {{ tab.title }}
      </li>
    </ul>
    <section class="tabs-content">
      <section>
        <p>{{ activeTab.content }}</p>
      </section>
    </section>
  </template>
  <template v-else>
    <p>データを取得中です。</p>
  </template>
</div>
```
```javascript
new Vue({
  el: '#example',
  data: {
    tabs: null,
    activeTab: null,
  },
  created() {
    setTimeout(() => {
      const fetchedData = [
        {
          id: 'tabs-1',
          title: 'タブ１',
          content: 'タブ１の内容が入ります。',
        },
        {
          id: 'tabs-2',
          title: 'タブ２',
          content: 'タブ２の内容が入ります。',
        },
        {
          id: 'tabs-3',
          title: 'タブ３',
          content: 'タブ３の内容が入ります。',
        },
      ];
      this.tabs = fetchedData;
      this.activeTab = fetchedData[0];
    }, 2000);
  },
});
```

## カスタムディレクティブ
* ディレクティブを自分で作り、Vueインスタンスに登録できる
* [フック関数 ](https://jp.vuejs.org/v2/guide/custom-directive.html#%E3%83%95%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0)
>呼び出されるタイミングを決める
> 例 bind ：ディレクティブが要素に紐づいたタイミングで１度だけ呼ばれるフック関数
* [ディレクティブフック引数](https://jp.vuejs.org/v2/guide/custom-directive.html#%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96%E3%83%95%E3%83%83%E3%82%AF%E5%BC%95%E6%95%B0)
>例 
```html
<div id="example">
  <p v-hide-async="2000">２秒後に非表示</p>
</div>
```
```javascript
//bindingには引数オブジェクトが格納
//今回の例だと下記
//{
//  name: 'hide-async',
//  value: 2000,
//}
Vue.directive('hide-async', {
  bind(el, binding) {
    setTimeout(() => {
      el.style.display = 'none';
    }, binding.value);
  },
});

new Vue({
  el: '#example',
});
```

## イベントハンドラ
>ディレクティブには、イベントが発生したときの動作を定義することもできる
```html
<div id="example">
  <p v-change-color="'red'">クリックすると赤に</p>
</div>
```
```javascript
Vue.directive('change-color', {
  bind(el, binding) {
    el.addEventListener('click', () => {
      el.style.color = binding.value;
    });
  },
});

new Vue({
  el: '#example',
});
```
## [Flickr API](http://westplain.sakuraweb.com/translate/flickr/Top.cgi)
