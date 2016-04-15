@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\viz-diff.js" %*
) ELSE (
  node  "%~dp0\viz-diff.js" %*
)