import React, { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export default props => {
	return (
		<>
			<IconButton onClick={props.onBack} color="primary" aria-label="backward" component="span">
				<FastRewindIcon />
			</IconButton>
			<IconButton onClick={props.onPlay} color="primary" aria-label="play pause" component="span">
				{(props.play) ? <PauseIcon /> : <PlayArrowIcon />}
			</IconButton>
			<IconButton onClick={props.onForward} color="primary" aria-label="forward" component="span">
				<FastForwardIcon />
			</IconButton>
			<FormControlLabel
				value="Unique"
				control={<Checkbox
					checked={props.isUnique}
					onChange={props.onUnique}
					inputProps={{ 'aria-label': 'primary checkbox' }}
				/>}
				label="Unique"
				labelPlacement="right"
			/>
			<Typography id="discrete-slider" gutterBottom>
				Size
				</Typography>
			<Slider
				defaultValue={10}
				aria-labelledby="discrete-slider"
				valueLabelDisplay="auto"
				onChange={props.getSize}
				value={props.size}
				step={10}
				marks
				min={10}
				max={30}
			/>
		</>
	);
}
