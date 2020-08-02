import React from 'react';
import { Icon, Header, Container, Button } from 'semantic-ui-react';
import './Footer.scss';

class Footer extends React.Component {
	socialIconData = [
		{
			name: 'linkedin',
			className: 'linkedin-social-icon',
			link: 'https://www.linkedin.com/in/marcus-pousette-a99590108/'
		},
		{
			name: 'facebook f',
			className: 'facebook-social-icon',
			link: 'https://www.facebook.com/marcus.pousette.1'
		},
		{
			name: 'instagram',
			className: 'instagram-social-icon',
			link: 'https://www.instagram.com/marcuspousette/'
		},
		{
			name: 'github',
			className: 'github-social-icon',
			link: 'https://github.com/marcuspousette'
		}
	];

	mailMe() {
		const mailAdress = 'mailto:marcus.pousette@mmrsolutions.se';
		window.location.href = mailAdress;
	}

	buttonExampleLabeledIcon = () => (
		<div className="footer-email-btn">
			<Button icon labelPosition="left" onClick={this.mailMe}>
				<Icon name="mail" />
				Get in touch
			</Button>
		</div>
	);

	toTop = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	};

	socialIcons = () => {
		const icons = this.socialIconData.map((e, i) => {
			return (
				<li key={i}>
					<Icon
						circular
						className={e.className}
						size="large"
						name={e.name}
						onClick={() => {
							window.open(e.link, '_blank');
						}}
					/>
				</li>
			);
		});
		return <ul className="social-icon-list">{icons}</ul>;
	};

	render() {
		return (
			<footer id="footer">
				<Icon circular size="big" name="angle up" className="footer-go-up" onClick={this.toTop} />
				<Container>
					<Header className="footer-header" as="h3">
						Fullstackmac by Marcus Pousette
					</Header>
					{this.socialIcons()}
					{this.buttonExampleLabeledIcon()}
				</Container>
			</footer>
		);
	}
}

export default Footer;
