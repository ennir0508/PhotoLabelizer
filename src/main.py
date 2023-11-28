"""This is a main program."""
import glob
import os
import sys

from name_generator import NameGenerator as ng


def generate_caption(filepath):
    """
    日本語キャプションを生成する
    """
    # キャプションの自動生成(英語)
    caption = ng.generate(filepath)
    # キャプションの日本語化
    caption_ja = ng.translate(caption)

    return {
        "filepath": filepath,
        "caption": caption,
        "caption_ja": caption_ja,
    }


def rename_file(filepath, caption, caption_ja):
    """
    ファイル名を変更する
    @param filepath 対象ファイル
    @param caption 説明
    @param caption_ja 変更後ファイル名(拡張子無)
    """

    # ファイル名
    basename = os.path.basename(filepath)
    # 拡張子無ファイル名
    basename_without_ext = os.path.splitext(basename)[0]
    # .拡張子
    ext = os.path.splitext(os.path.basename(filepath))[1]

    info = {
        "変更前    :": basename,
        "説明(英語):": caption,
        "変更後    :": caption_ja + ext,
    }
    print("")
    for key, value in info.items():
        print(key, value)

    # ユーザーの確認を促す
    answer = input("ファイル名を変更しますか？(Y/N): ")
    if answer[0].lower() == "y":
        new_filepath = filepath.replace(basename_without_ext, caption_ja)
        os.rename(os.path.abspath(filepath), os.path.abspath(new_filepath))
        print("ファイル名を変更しました")
    else:
        print("ファイル名を変更しませんでした")


if __name__ == "__main__":
    args = sys.argv
    if 2 <= len(args):
        # 実行ファイル名は除く
        args.pop(0)
        # 引数に対してそれぞれ
        for arg in args:
            # ファイルが存在する場合
            if os.path.isfile(arg):
                caption_data = generate_caption(arg)
                rename_file(
                    caption_data["filepath"],
                    caption_data["caption"],
                    caption_data["caption_ja"],
                )
            # ディレクトリが存在する場合
            elif os.path.exists(arg):
                filelist = glob.glob(arg + "*.jpg")
                caption_data_list = list(map(generate_caption, filelist))
                list(
                    map(
                        lambda cap: rename_file(
                            cap["filepath"], cap["caption"], cap["caption_ja"]
                        ),
                        caption_data_list,
                    )
                )
            else:
                print("存在しないファイルまたはディレクトリです: " + arg)
    else:
        print("引数がありません")
