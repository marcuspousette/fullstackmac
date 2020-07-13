import React from 'react';
import { Header, Container } from 'semantic-ui-react';

import './Burger.scss';

class Burger extends React.Component {
	render() {
		return (
			<div id="Burger">
				<span className="Burger__bar Burger__bar--1"></span>
				<span className="Burger__bar Burger__bar--2"></span>
				<span className="Burger__bar Burger__bar--3"></span>
			</div>
		);
	}
}

export default Burger;
