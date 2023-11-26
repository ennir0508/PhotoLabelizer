# 環境構築

## Python 仮想環境 ~ Windows + Scoop ~

### 0. Python の仮想環境の作成

1度のみ実行すればよい.
もし,仮想環境管理フォルダや仮想環境フォルダが存在する場合はこの手順は不要.

#### 0.1. 仮想環境管理フォルダを作成

```powershell
mkdir $env:USERPROFILE\venv
```

#### 0.2. 仮想環境を作成

python コマンドから仮想環境を作成する.

今回は Scoop を利用して Python のバージョンを管理している. これにより,特定の
Pythonのバージョンを基に仮想環境が作成される.

{仮想環境名}は Python のバージョンがわかるような python3.X
や使用するアプリの名称等を利用すればよい.

```powershell
$env:USERPROFILE\scoop\apps\python\{version}\python -m venv $env:USERPROFILE\venv\{仮想環境名}
```

:warning: Python
コマンドは環境変数が読み込めない可能性があるので,その場合は実際のパスを入力すること.

### 1. Python の仮想環境への切替

#### 1.1. 現在のバージョンを確認

```powershell
python -V
```

#### 1.2. 対象バージョンの有効化

```powershell
$env:USERPROFILE\venv\{仮想環境名}\Scripts\Activate.ps1
```

#### 1.3. 変更後のバージョンを確認

```powershell
python -V
```

### 2. pip

#### 2.1. pip ライブラリのインストール

```powershell
pip install {ライブラリ名}
```

#### 2.2. インストール済 pip ライブラリの確認

```powershell
pip freeze
```

### 3. 仮想環境の終了

```powershell
deactivate
```

### 3.1. 確認

```powershell
python -V
```

```powershell
pip freeze
```

## 開発環境

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
