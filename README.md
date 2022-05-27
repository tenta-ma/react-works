# フレームワーク

## 開発

    React + TypeScript + MUI

## CSS

    MUIのthemeを利用

## 静的解析

    eslint

    importに関しては、vscodeのコンテキストメニューから「インポートの並び替え」「インポートの整理」で行う

### tips

#### useEffect の引数による warning

    useEffectを利用する際などで、明らかに必要なもののみ引数としたくとも
    eslintで「引数に指定されていない」とwarningが出る場合がある
    この時、以下コメントを設定することで、上記の場合のwarningが出なくなる

```
// eslint-disable-next-line react-hooks/exhaustive-deps
```

#### MUI の data-testid 設定

    MUI(material ui v5)を利用している関係上
    input (etc. TextField)に対して"data-testid"を設定しても
    実際に(テスト中などで)展開されるhtml上のinputには"data-testid"が設定されない
    そのため、idを設定するか(passwordでは取れないらしい？(要検証))、パラメータinputPropsを設定する手段がある

```
// MUI 未使用
<input
  type="text"
  name="username"
  defaultValue={username}
  onChange={(e) => {
    setUsername(e.target.value);
  }}
  "data-testid": "username",
/>
// MUI(TextField)利用
<TextField
  type="text"
  name="username"
  defaultValue={username}
  onChange={(e) => {
    setUsername(e.target.value);
  }}
  inputProps={{
    "data-testid": "username",
  }}
/>
```

## ユニットテスト

    react-testing-library

## テストランナー

    jest

## Mock

    jest-mock

# 実行方法に関して

## ライブラリのインストール

```
npm in
or
npm install
```

で package.json に定義してあるライブラリをダウンロードしてくる

## 実行時のコマンド

package.json に定義されている

### ローカル開発環境での実行

環境定義ファイルとして "src/\_config/.env.local"を読み込む

```
npm run local
```

## PWA に関して

### ローカル開発環境での実行に関して

PWA は https が基本となるが  
localhost であれば、実行も可能である(serviceWorkerRegistration.ts#isLocalhost も参照)  
そのため、build したファイルを localhost の apatch とかに配置することで検証可能である

### 実機での検証に関して

#### iOS のオフラインテストに関しての注意

iOS は仕様上の問題で、初回の起動に関してはオンライン上で実行し
キャッシュを install する必要がある

### ビルド成果物に関して

- service-worker.js
- service-worker.js.map

というのが追加が作成されている  
また、これらは index.tsx と service-worker.ts が同じディレクトにないと  
いい感じに？出力してくれないため、PWA が機能しない

```
# serviceWorkerRegistration.ts
  // service-worker.jsをPUBLIC_URLから相対パスで読み込みに行く
  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
```

ここを変更すれば service-worker.js も移動できるはずだが  
デフォルトから変更する必要もないと判断したため

- index.tsx
- service-worker.ts
- serviceWorkerRegistration.ts

は同レベルのフォルダに配置しておくこと

### テスト実行

対話式でテストが実行

```
npm test
```

非対話式で非同期ですべてのテストを実行

```
npm run local-test
```

非対話式で同期的にすべてのテストを実行(jenkins 等の機械的な実行を想定)

```
npm run dev-test
```

# 補足

## 環境差分に関して

src/\_config/以下に配置してある

```
# プロジェクトのカレントディレクトリからの操作想定
# _config/.env.localを利用してのアプリケーション起動方法
npm run local
```

上記のコマンドは  
package.json/scripts に記載がある

# swagger の利用に関して

openapi-generator-cli を利用し、出力した API ソースを利用する  
以下の例はコマンドプロンプトの実行で改行が「^」であることに注意してください

```
#rem openapi.yml
java -jar openapi-generator-cli-5.4.0.jar generate ^
     -g typescript-axios ^
     -i openapi.yml ^
     -o src/services/api/
```

生成されたファイルは所定の場所にすべてコピーしてください  
e.g. openapi-generator のバージョンが 5.4.0 の場合、以下のファイルを  
src\services\api\ にコピーする

- api.tx
- basse.ts
- common.ts
- configuration.ts
- index.ts

## openapi-generator-cli で不明な点

multipart/form-data の場合  
リクエストパラメータで enum が指定できない？  
(可能なのかもしれないが)設定方法が不明  
※application/json では問題なく enum が認識され、ソースが生成された

その結果、generate 時に enum(MovieUnit)が Unused という扱いになり？ソースに生成されない  
multipart/form-data を使わずに application/json にするか  
enum ではなく String にする、という対応策がある

※かといって、完全に参照を外した MovieUnit が存在する場合、enum は生成される

## select box の実装に関して

material ui の select box を使うけど
出身国が件数多すぎて rendering がもっさり感があったので

```
<Select netive />
```

で実装する必要があると思った
横にならえで他 select も同様にしている

## パスポートの IC 読み取り(NFC)に関して

iOS(少なからず iOS16 までに関して) + safari の仕様上  
Web NFC API は実装されないため  
ref : https://www.zdnet.com/article/apple-declined-to-implement-16-web-apis-in-safari-due-to-privacy-concerns/

PWA である限りパスポートの IC 読み取りは実装不可能

Web NFC API ref : https://developer.mozilla.org/ja/docs/Web/API/NDEFReader
