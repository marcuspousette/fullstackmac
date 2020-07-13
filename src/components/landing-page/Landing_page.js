import React from 'react';
import { Header, Container, Image } from 'semantic-ui-react';
import Burger from '../burger/Burger.js';
import './Landing_page.scss';

const ImageExampleImage = () => <Image src="/fullstackmac-logo.svg" size="large" className="Landing_page__logo" />;

class Landing_page extends React.Component {
	render() {
		return (
			<div id="Landing_page">
				<Container className="Landing_page__background">
					<Header as="h1" className="Landing_page__header">
						<span className="Landing_page__header--first">MARCUS</span>
						<span className="Landing_page__header--second">POUSETTE</span>
					</Header>
					<Burger />
					<ImageExampleImage />
				</Container>
			</div>
		);
	}
}

export default Landing_page;
