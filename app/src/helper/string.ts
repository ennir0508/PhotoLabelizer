/**
 * パスからファイル名を取得する
 * @param {string} path
 */
export const getFilenameByPath = (path: string) => {
  return path.split("/").pop() || "";
}
