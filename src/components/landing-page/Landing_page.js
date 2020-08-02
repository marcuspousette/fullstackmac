import React from 'react';
import gsap from 'gsap';
import { Header, Container, Grid } from 'semantic-ui-react';
import Burger from '../burger/Burger.js';
import './Landing_page.scss';
import Logo from '../logo/Logo.js';
import ContactMe from '../contact-me-btn/ContactMeBtn';
import ScrollIndicator from '../scroll-indicator/ScrollIndicator';
import ProjectCard from '../project-card/ProjectCard';
import { myWork } from '../../static-data/myWork.js';
import Footer from '../footer/Footer';
import WindowService from '../../api/service/WindowService';
import ProjectCardAnimated from '../project-card/ProjectCardAnimated';

const currentCardBlueprint = {
	header: null,
	subHeader: null,
	link: null,
	imageURL: null,
	key: null,
	description: null
};

class Landing_page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
			currentCard: currentCardBlueprint
		};
		this.logStyle = {
			opacity: 0
		};

		this.leftCurtain = React.createRef();
		this.rightCurtain = React.createRef();
		this.zIndexDelay = 1000;
	}

	createDesktopExpandAnimation = () => {
		const duration = 0.7;
		const ease = '"power2.in",';
		const left = {
			width: '50vw',
			duration: duration,
			ease: ease
		};
		const right = {
			x: '0',
			duration: duration,
			ease: ease
		};
		this.desktopExpandAnimation = gsap.timeline({ paused: true });
		this.desktopExpandAnimation.to('.curtain-left', left);
		this.desktopExpandAnimation.to('.curtain-right', right, '<');
	};

	createMobileExpandAnimation = () => {
		const duration = 0.3;
		const ease = '"power2.in",';
		const easeBack = '"power2",';

		const left = {
			width: '50vw',
			duration: duration,
			ease: ease
		};
		const right = {
			x: '0',
			duration: duration,
			ease: ease
		};

		const projectCard = {
			opacity: 1,
			duration: 0,
			visibility: 'visible',
			ease: easeBack
		};
		const img = {
			y: 0,
			duration: duration,
			ease: easeBack
		};
		const background = {
			y: 0,
			duration: duration,
			ease: easeBack
		};
		this.mobileExpandAnimation = gsap.timeline({ paused: true });
		this.mobileExpandAnimation.to('.curtain-left', left);
		this.mobileExpandAnimation.to('.curtain-right', right, '<');
		this.mobileExpandAnimation.to('.Project_card_animated', projectCard, '-0.5');
		this.mobileExpandAnimation.to('.Project_card_animated__image', img);
		this.mobileExpandAnimation.to('.Project_card_animated__background', background, '<');
	};

	toggleDesktopCurtains = (expanded, target) => {
		if (expanded) {
			this.desktopExpandAnimation.reverse();
			setTimeout(() => {
				target.style.zIndex = 0;
			}, this.zIndexDelay);
		} else {
			this.desktopExpandAnimation.play();
			target.style.zIndex = 1000;
		}
	};

	toggleMobileCurtains = () => {
		const { expanded } = this.state;
		if (expanded) {
			this.mobileExpandAnimation.reverse();
		} else {
			this.mobileExpandAnimation.play();
		}
	};

	toggleAnimatedProjectCard = (card) => {
		const { props } = card;
		this.setState({ currentCard: props });
		this.toggleMobileCurtains();
	};

	toggleExpanded = () => {
		const { expanded } = this.state;
		this.setState({ expanded: !expanded });
	};

	onExpandToggle = (card) => {
		const target = card.ref.current;
		this.toggleExpanded();
		const isBigDesktop = WindowService.isBigDesktop();
		const { expanded } = this.state;
		isBigDesktop ? this.toggleDesktopCurtains(expanded, target) : this.toggleAnimatedProjectCard(card);
	};

	myWordCards = () => {
		const cards = myWork.map((e, i) => (
			<Grid.Column key={i} className="my-work-grid__column">
				<ProjectCard
					header={e.header}
					subHeader={e.subHeader}
					link={e.link}
					imageURL={e.imageURL}
					key={e.header}
					description={e.description}
					onButtonClick={this.onExpandToggle}
				/>
			</Grid.Column>
		));
		return (
			<Grid stackable columns={3} className="my-work-grid">
				{cards}
			</Grid>
		);
	};

	animateLogo = () => {
		const logoAnimation = gsap.timeline();
		logoAnimation
			.fromTo('#right-horn', { x: -80 }, { x: 0, duration: 0.5, delay: 2 })
			.fromTo('#left-horn', { x: 80 }, { x: 0, duration: 0.5 }, '<')
			.to('#fullstackmac-text', { opacity: 1, duration: 0.5 });
	};

	componentDidMount() {
		this.createDesktopExpandAnimation();
		this.createMobileExpandAnimation();
		this.animateLogo();
	}

	render() {
		return (
			<div id="Landing_page">
				<div ref={this.leftCurtain} className="curtain curtain-left"></div>
				<div ref={this.rightCurtain} className="curtain curtain-right"></div>
				<ProjectCardAnimated
					header={this.state.currentCard.header}
					subHeader={this.state.currentCard.subHeader}
					link={this.state.currentCard.link}
					imageURL={this.state.currentCard.imageURL}
					description={this.state.currentCard.description}
					onButtonClick={this.onExpandToggle}
				/>

				<ContactMe />
				{/* <Burger /> */}
				<Container className="Landing_page__background">
					<div className="Landing_page__background-image"></div>
					<Header as="h1" className="Landing_page__header">
						<span className="Landing_page__header--first">MARCUS</span>
						<span className="Landing_page__header--second">POUSETTE</span>
					</Header>
					<Logo classes="Landing_page__logo" style={this.logStyle} />
				</Container>
				<ScrollIndicator className="" />
				<Container className="my-work">
					<div className="my-work__header">
						<h3 className="my-work__header__text">Some of my latest work</h3>
					</div>

					{this.myWordCards()}
				</Container>
				<Footer />
			</div>
		);
	}
}

export default Landing_page;
