import { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { invoke, path } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { convertFileSrc } from "@tauri-apps/api/tauri";

import { Footer } from "./component/Footer";
import { Header } from "./component/Header";
import { PhotoListItem } from "./component/PhotoListItem";
import { getFilenameByPath } from "./helper/string";
import { File, GetFilenameResponse, Photo, PostFilenameResponse } from "./type";

const App = () => {
  // 画像一覧
  const [photoList, setPhotoList] = useState<Array<Photo>>([]);

  // ファイルを選択するクリック時
  const handleSelectPhoto = async () => {
    // ファイル選択ダイアログを表示する
    // 選択されたファイルの絶対パスのリストを取得する
    const filePathList = await open({
      directory: false,
      multiple: true,
      defaultPath: "/root/home/pictures",
    }) as string[];

    setPhotoList(
      await Promise.all(
        filePathList?.map((path: string, i: number) => {
          return {
            index: i,
            image: convertFileSrc(path),
            title: getFilenameByPath(path),
            path: path,
            selected: false,
          };
        }) ?? [],
      ),
    );
    invoke("greet");
    invoke("get_filename_by_ai", { filePathList: filePathList })
      .then((res: GetFilenameResponse) => {
        console.log({ status: res.status, message: res.message });
        res.result.map((
          x: File,
          index,
        ) => console.log(`result [${index}]: ${x.path}`));
      }).catch((e) => console.error(e));
  };

  // ファイルを選択するクリック時
  const handleRenamePhoto = async () => {
    const filePathList = photoList.map((o) => o.path);
    invoke("post_filename", { filePathList: filePathList })
      .then((res: PostFilenameResponse) => {
        console.log({ status: res.status, message: res.message });
      }).catch((e) => console.error(e));
  };

  return (
    <>
      <Header />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Photo Labelizer
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={handleSelectPhoto}>
                Select Photo
              </Button>
              <Button variant="outlined" onClick={handleRenamePhoto}>
                Rename Photo
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {photoList.map(({ index, image, path, title, selected }) => {
              return (
                <PhotoListItem
                  index={index}
                  title={title}
                  path={path}
                  image={image}
                  selected={selected}
                />
              );
            })}
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
