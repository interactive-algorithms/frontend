import React, { useState, useEffect } from "react";
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';

export default props => {
	return (
		<>
		<IconButton onClick={props.onPlay} color="primary" aria-label="upload picture" component="span">
			{(props.play) ? <PauseIcon /> : <PlayArrowIcon /> }
		</IconButton>
		</>
	);
}
