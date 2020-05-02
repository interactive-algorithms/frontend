import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import "./index.css";

export default props => {
	return (
		<>
			<Box component="span" m={1}>
				<Grid className="container" container spacing={2}>
					<Grid item className="west" md={12} xs={12} >
						<Button variant="contained" color="primary" onClick={props.genNew}>New</Button>
						<IconButton onClick={props.onBack} color="primary" aria-label="backward" component="span">
							<FastRewindIcon />
						</IconButton>
						<IconButton onClick={props.onPlay} color="primary" aria-label="play pause" component="span">
							{(props.play) ? <PauseIcon /> : <PlayArrowIcon />}
						</IconButton>
						<IconButton onClick={props.onForward} color="primary" aria-label="forward" component="span">
							<FastForwardIcon />
						</IconButton>

						<FormGroup row>
							<FormControlLabel
								className="isUnique"
								value="Unique"
								control={<Checkbox
									checked={props.isUnique}
									onChange={props.onUnique}
									inputProps={{ 'aria-label': 'primary checkbox' }}
								/>}
								label="Unique"
								labelPlacement="start"
							/>
						</FormGroup>
					</Grid>

					<Grid item m={1} md={6} xs={6}>
						<Typography id="discrete-slider" gutterBottom>
							Size
						</Typography>
						<Slider
							defaultValue={10}
							aria-labelledby="discrete-slider"
							onChange={props.setSize}
							value={props.size}
							step={10}
							min={10}
							max={50}
						/>
					</Grid>
					<Grid item md={6} xs={6}>
						<Typography id="discrete-slider" gutterBottom>
							Speed
						</Typography>
						<Slider
							defaultValue={10}
							aria-labelledby="discrete-slider"
							onChange={props.setSpeed}
							value={props.speed}
							step={1}
							min={1}
							max={1000}
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
