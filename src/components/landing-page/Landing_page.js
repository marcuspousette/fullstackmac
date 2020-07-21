import React from 'react';
import gsap from 'gsap';
import { Header, Container, Image, FormButton } from 'semantic-ui-react';
import Burger from '../burger/Burger.js';
import './Landing_page.scss';
import Logo from '../logo/Logo.js';

const logStyle = {
	text: {
		opacity: 0
	}
};

class Landing_page extends React.Component {
	componentDidMount() {
		const logoAnimation = gsap.timeline();
		logoAnimation
			.fromTo('#right-horn', { x: -80 }, { x: 0, duration: 0.5, delay: 2 })
			.fromTo('#left-horn', { x: 80 }, { x: 0, duration: 0.5 }, '<')
			.to('#fullstackmac-text', { opacity: 1, duration: 0.5 });
	}

	render() {
		return (
			<div id="Landing_page">
				<Burger />
				<Container className="Landing_page__background">
					<div className="Landing_page__background-image"></div>
					<Header as="h1" className="Landing_page__header">
						<span className="Landing_page__header--first">MARCUS</span>
						<span className="Landing_page__header--second">POUSETTE</span>
					</Header>
					<Logo classes="Landing_page__logo" style={logStyle} />
				</Container>
			</div>
		);
	}
}

export default Landing_page;
