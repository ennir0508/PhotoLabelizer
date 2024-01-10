# VcXsrvを最後に保存した設定を用いて起動する
# XLaunchをデフォルト設定でダウンロードした場合は下記で実行可能
# すでにVcXsrvが起動している場合は何もしない
if (!(Get-Process -Name "vcxsrv" -ErrorAction SilentlyContinue)) {
  & "C:\Program Files\VcXsrv\xlaunch.exe" -run "$env:USERPROFILE\config.xlaunch"
}
