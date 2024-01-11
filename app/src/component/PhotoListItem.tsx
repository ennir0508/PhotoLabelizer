
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

type Props = {
  key: number;
  image: string;
  title: string;
  selected: boolean;
}

export const PhotoListItem: React.FC<Props> = ({key, image, title, selected }: Props) => {
  
  return (
    <>
      <Grid item key={key} xs={12} sm={6} md={4}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: '56.25%',
            }}
            image={image || "https://source.unsplash.com/random?wallpapers"}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div" style={{ wordWrap: "break-word" }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ wordWrap: "break-word" }}>
              {title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}
