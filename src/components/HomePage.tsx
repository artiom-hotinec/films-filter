import { useEffect, useState } from 'react'
import Modal from './Modal';
import films from '../data/films.json'
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';

export type Film = {
  label: string;
  rating: number;
  genre: string;
  imgUrl: string;
  embeddedId: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer'
}));

export default function HomePage () {

  const [modal, setModal] = useState(false);
  const [film, setFilm] = useState({});
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [showingFilms, setShowingFilms] = useState<Film[]>(films);

  const [inputValue, setInputValue] = useState("");


  const handleChangeGenre = (e: any) => {
    setGenre(e.target.value);
  };

  const handleChangeRating = () => {
    setRating(null);
  };

  const handleCloseModal = () => {
    setModal(false);
  }

  const onBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) setModal(false);
  }

  const genres = Array.from(new Set(films.map(({ genre }) => genre)).add("Any genre"))

  const filteredOptions = films.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    if (genre)  setShowingFilms(films.filter((film) =>  film.genre === genre ))
    if (rating) setShowingFilms(films.filter((film) => film.rating >= rating))
    if (genre === "Any genre")  setShowingFilms(films)
    if (!rating)  setShowingFilms(films)
    if (!rating && genre === "Any genre") return setShowingFilms(films)
    if (!rating && genre) return setShowingFilms(films.filter((film) => film.genre === genre))
    if (genre === "Any genre" && rating) return setShowingFilms(films.filter((film) =>  film.rating >= rating ))
    if (genre && rating) return setShowingFilms(films.filter((film) => film.genre === genre && film.rating >= rating))
  }, [genre, rating])


  return <>
    <Box py={5}>
      <Paper
        sx={{paddingY: '40px'}}
        elevation={3}
      >
        <Box  px={3}>
          <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
            <Grid
              container
              justifyContent='space-between'
              alignItems="center"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={8} md={5}>
                <Autocomplete
                  fullWidth
                  freeSolo
                  disablePortal
                  id="combo-box-demo"
                  options={inputValue ? filteredOptions : []}
                  onChange={(e, newValue) => {
                    if (!newValue) return setShowingFilms(films)
                    setShowingFilms([newValue as Film])
                  }}
                  onInputChange={(e, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  inputValue={inputValue}
                  renderInput={(params) => <TextField {...params} label="Search the movie" />}
                  renderOption={(props, option) => (
                    <Box component="li"  {...props}>
                      <Grid
                        container
                        justifyContent='space-between'
                        alignItems='center'
                      >
                        <Box>
                          <Grid
                            container
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='start'
                          >
                            {option.label}
                            <Rating
                              readOnly
                              precision={0.5}
                              name="stars"
                              value={option.rating}
                              max={10}
                            />
                          </Grid>
                        </Box>
                        {option.genre}
                      </Grid>
                    </Box>
                  )}
                />
              </Grid>

              <Grid item xs={4} sm={6} md={5}>
                <Box>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack direction="row" justifyContent="space-around" alignItems="center" width={300}>
                      <Typography> Rating </Typography>
                      <Button disabled={!rating} variant="text" onClick={handleChangeRating}>Any rating</Button>
                    </Stack>
                    <Rating
                      name="rating"
                      value={rating}
                      max={10}
                      onChange={(e, newValue)=>{setRating(newValue)}}
                    />
                  </Grid>
                </Box>
              </Grid>


              <Grid item xs={4} sm={2} md={2}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={genre}
                      label="Genre"
                      onChange={handleChangeGenre}
                    >
                    {genres.map((genre) =>
                      <MenuItem
                        style={genre === "Any genre"
                          ? { color: 'gray' }
                          : {}
                        }
                        key={genre}
                        value={genre}
                      >
                        {genre}
                      </MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {showingFilms.map((film, index) => (
                <Grid item xs={4} sm={4} md={4} key={index}>
                  <Item
                    onClick={() => {
                      setFilm(film)
                      setModal(true)
                    }}
                  >
                    <Grid
                      container
                      spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={4} sm={8} md={12}>
                        <Grid
                          container
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <Typography fontWeight={700} noWrap>{film.label}</Typography>
                          <Typography noWrap>{film.genre}</Typography>
                        </Grid>
                      </Grid>

                        <Grid item xs={4} sm={8} md={12}>
                          <Rating
                            readOnly
                            precision={0.5}
                            name="stars"
                            value={film.rating}
                            max={10}
                          />
                        </Grid>
                        <Grid item xs={4} sm={8} md={12}>
                          <Box >
                            <img src={ film.imgUrl } alt={ film.label } width='100%' height='100%'/>
                          </Box>
                        </Grid>
                    </Grid>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
      
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={modal}
      onClick={onBackdropClick}
    >
      <Modal open={modal}
        film={film as Film}
        handleCloseModal={handleCloseModal}
      />
    </Backdrop>
  </>
}
