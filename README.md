# PhotoLabelizer

This is auto naming app for image file.

## 環境

| 対象   | バージョン    | 備考 |
| :----- | :------------ | :--- |
| python | python 3.11.4 |      |
| pip    | pip 23.1.2    |      |

### pip ライブラリ

[LAVIS - A Library for Language-Vision Intelligence](https://github.com/salesforce/LAVIS)

画像のキャプション生成用

```powershell
pip install salesforce-lavis
```

[Googletrans](https://github.com/ssut/py-googletrans)

キャプションの日本語対応用

```powershell
pip install googletrans==3.1.0a0
```

:warning: 特定のバージョンでない場合,以下のようなエラーになる可能性がある

```log
Traceback (most recent call last):
    caption_ja = translator.translate(caption, src='en', dest='ja').text
                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AttributeError: 'NoneType' object has no attribute 'group'
```

## 使用方法

src/main.py を実行する.

引数には画像ファイルのパス,または画像ファイルが配置されているディレクトリのパスを入力する

途中で変更確認があるため, Y または N を入力する

例：

```powershell
python .\src\main.py C:\Users\xxx\Pictures\image-123456.jpg
```
