import React from 'react';
import { Header, Container, Image } from 'semantic-ui-react';
import Burger from '../burger/Burger.js';
import './Landing_page.scss';
import Logo from '../logo/Logo.js';

class Landing_page extends React.Component {
	render() {
		return (
			<div id="Landing_page">
				<Burger />
				<Container className="Landing_page__background">
					<Header as="h1" className="Landing_page__header">
						<span className="Landing_page__header--first">MARCUS</span>
						<span className="Landing_page__header--second">POUSETTE</span>
					</Header>
					<Logo classes="Landing_page__logo" />
				</Container>
			</div>
		);
	}
}

export default Landing_page;
