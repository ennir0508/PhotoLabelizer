/**
 * @type {Object} Photo
 * @property {number} index id
 * @property {string} image 画像ファイルパス(image属性値)
 * @property {string} title ファイル名
 * @property {string} path ファイルパス
 * @property {boolean} selected 選択済かどうか
 */
export type Photo = {
  index: number;
  image: string;
  title: string;
  path: string;
  selected: boolean;
};

type Response = {
  status: number;
  message: string;
};

export type File = {
  id: number;
  path: string;
  recommend_name: string;
};

export type GetFilenameResponse = Response & {
  result: Array<File>;
};

export type PostFilenameResponse = Response;
