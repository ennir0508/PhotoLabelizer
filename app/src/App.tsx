import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { readDir, BaseDirectory, FileEntry } from "@tauri-apps/api/fs";
import { homeDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';

import { Footer } from "./component/Footer"
import { Header } from "./component/Header"
import { PhotoListItem } from './component/PhotoListItem';

type Photo = {
  index: number;
  image: string;
  title: string;
  selected: boolean;
}

const cards: Array<Photo> = [
  {
    index: 1,
    image: "dummy1.jpg",
    title: "newimg1",
    selected: false,
  }, {
    index: 2,
    image: "dummy2.jpg",
    title: "newimg2",
    selected: false,
  }, {
    index: 3,
    image: "dummy3.jpg",
    title: "newimg3",
    selected: false,
  }, {
    index: 4,
    image: "dummy4.jpg",
    title: "newimg4",
    selected: false,
  }
];

function App() {
  const [cardList, setCardList] = useState<Array<Photo>>([])

  // 初期表示時
  useEffect(() => {
    async function initCardList() {
      const homeDirPath: string = await homeDir();
      const newCardList: Array<Photo> = await Promise.all(cards.map(async (card) => {
        const imageFullPath: string = await join(homeDirPath, "/home/pictures/", card.image)
        console.log({card, imageFullPath});
        
        return {
          index: card.index,
          image: convertFileSrc(imageFullPath),
          title: card.title,
          selected: false
        } as Photo;
      })) 
      setCardList(newCardList)
    }
    initCardList()
  }, [])

  // // 画像一覧変更時
  // useEffect(() => {
  //
  // }, [cardList])

  return (
    <>
      <Header />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
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
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cardList.map(({ index, image, title, selected }) => {
              return <PhotoListItem key={index} title={title} image={image} selected={selected} />
            })}
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
