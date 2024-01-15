import { Button, Grid, IconButton, Paper, Rating, Typography, Box } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Film } from './HomePage'
import YoutubeEmbed from './YoutubeEmbed'

type Props = {
	film: Film,
	handleCloseModal: () => void
	open: boolean
}

export default function Modal({ handleCloseModal, film, open }: Props) {
	if (!open) return null
	return <>
		<Paper elevation={6}>
			<Box px={{ xs: 1, sm: 1, md: 3 }} pb={5} position='relative' sx={{ width: { xs: '90vw', sm: '80vw', md: '70vw' } }}>
				<Grid container direction='column' justifyContent='space-around' alignItems='center'>
					<Typography mt={3} variant='h5'>Hello!</Typography>
					<Typography mt={3} gutterBottom color='gray'>{`You chosen a movie "${film?.label}", have a nice watching`}</Typography>
					{film.rating !== undefined && <Rating
						readOnly
						precision={0.5}
						name={`film ${film.embeddedId}`}
						value={film.rating}
						max={10}
					/>}

					<Box mt={5} sx={{ width: '100%' }} >
						{film.rating !== undefined && <YoutubeEmbed embedId={film.embeddedId} />}
					</Box>

					<Box mt={5} width={180}>
						<Button fullWidth  onClick={handleCloseModal} variant="contained">OK</Button>
					</Box>
				</Grid>
				<IconButton
					onClick={handleCloseModal}
					style={{ position: 'absolute', top: 10, right: 10, zIndex:10 }}
				>
					<Close/>
				</IconButton>
			</Box>
		</Paper>
	</>
}
