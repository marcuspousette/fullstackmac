import React from 'react';
import { Icon } from 'semantic-ui-react';
import './SeeMoreBtn.scss';

function SeeMoreBtn(props) {
	return (
		<div className="See_more_btn" onClick={props.onButtonClick}>
			<Icon className="See_more_btn__icon" name="play" size="large" />
		</div>
	);
}

export default SeeMoreBtn;
