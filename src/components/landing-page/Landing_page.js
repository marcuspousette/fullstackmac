import React from 'react';
import gsap from 'gsap';
import { Header, Container, Button } from 'semantic-ui-react';
import Burger from '../burger/Burger.js';
import './Landing_page.scss';
import Logo from '../logo/Logo.js';
import ContactMe from '../contact-me-btn/ContactMeBtn';
import ScrollIndicator from '../scroll-indicator/ScrollIndicator';

const logStyle = {
	opacity: 0
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
				<ContactMe />
				<Burger />
				<Container className="Landing_page__background">
					<div className="Landing_page__background-image"></div>
					<Header as="h1" className="Landing_page__header">
						<span className="Landing_page__header--first">MARCUS</span>
						<span className="Landing_page__header--second">POUSETTE</span>
					</Header>
					<Logo classes="Landing_page__logo" style={logStyle} />
				</Container>
				<ScrollIndicator />
				<Container className="my-work">
					<div class="my-work__header">
						<h3 className="my-work__header__text">Some of my latest work</h3>
					</div>
				</Container>
			</div>
		);
	}
}

export default Landing_page;
