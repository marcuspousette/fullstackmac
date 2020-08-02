import React from 'react';
import gsap from 'gsap';
import { Header, Button, Icon } from 'semantic-ui-react';
import WindowService from '../../api/service/WindowService';
import SeeMoreBtn from '../see-more-btn/SeeMoreBtn.js';
import './ProjectCard.scss';

class ProjectCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};
		this.ref = React.createRef();
	}

	throttleAnimationSpam = () => {
		const btn = this.ref.current.querySelector('.See_more_btn');
		btn.style.pointerEvents = 'none';
		gsap.to(btn, { opacity: 0.5 });
		setTimeout(() => {
			btn.style.pointerEvents = 'all';
			gsap.to(btn, { opacity: 1 });
		}, 1000);
	};

	onButtonClick = () => {
		const expanded = !this.state.expanded;
		this.setState({ expanded: expanded });

		const isBigDesktop = WindowService.isBigDesktop();
		isBigDesktop ? this.expandCardDesktop(expanded) : this.expandCardMobile(expanded);
		this.props.onButtonClick(this);
		if (!expanded) {
			this.throttleAnimationSpam();
		}
	};

	createDesktopAnimation() {
		const { current } = this.ref;
		const { childNodes } = current;
		const { innerWidth } = WindowService.getWindowDimensions();
		const centerWidth = innerWidth / 2;
		const { x } = current.getBoundingClientRect();
		const duration = 0.5;
		const ease = 'back.out(1.7)';

		const cardTo = {
			duration: duration,
			left: centerWidth,
			xPercent: -50,
			yPercent: -50,
			x: -x,
			scale: 1,
			ease: ease,
			y: -200
		};

		const backgroundExpandedStyle = {
			duration: duration,
			height: 550,
			width: 638,
			ease: ease,
			xPercent: -30
		};

		const imageExpandedStyle = {
			duration: duration,
			height: 550,
			width: 550,
			xPercent: 30,
			scale: 1,
			ease: ease,
			top: '-55%'
		};

		const btnStyle = {
			duration: duration,
			y: 80,
			ease: ease,
			rotate: 90
		};

		const headerStyle = {
			duration: duration,
			ease: ease,
			y: -370
		};

		const textStyle = {
			duration: 0.1,
			scale: 1,
			opacity: 1
		};

		const linkStyle = {
			duration: 0.1,
			scale: 1,
			opacity: 1,
			y: 20
		};

		const btn = childNodes[0].querySelector('.Project_card__background__btn-container');
		const header = childNodes[0].querySelector('.Project_card__background__header');
		const text = childNodes[0].querySelector('.Project_card__background__text');
		const link = childNodes[0].querySelector('.Project_card__background__link');

		this.desktopExpandAnimation = gsap.timeline({ paused: true });
		this.desktopExpandAnimation.to(current, cardTo);
		this.desktopExpandAnimation.to(childNodes[0], backgroundExpandedStyle, '<');
		this.desktopExpandAnimation.to(btn, btnStyle, '<');
		this.desktopExpandAnimation.to(header, headerStyle, '<');
		this.desktopExpandAnimation.to(childNodes[1], imageExpandedStyle, '<');
		this.desktopExpandAnimation.to(text, textStyle);
		this.desktopExpandAnimation.to(link, linkStyle);
	}

	createMobileAnimation = () => {
		const { current } = this.ref;
		const { childNodes } = current;
		const { innerWidth, innerHeight } = WindowService.getWindowDimensions();
		const centerWidth = innerWidth / 2;
		const halfHeight = innerHeight / 2;
		const duration = 0.5;
		const delay = 0.5;
		const ease = 'back.out(1.7)';

		const cardTo = {
			position: 'fixed',
			top: 0,
			left: 0,
			height: innerHeight,
			width: innerWidth,
			duration: 0,
			zIndex: 200,
			marginTop: 0,
			scale: 1,
			ease: ease
		};
		const backgroundFrom = {
			duration: 0,
			height: innerHeight,
			width: innerWidth,
			top: 0,
			overflowY: 'auto',
			overscrollBehaviorY: 'none',
			zIndex: 300,
			background: 'transparent',
			ease: ease
		};
		const imageFrom = {
			duration: 0,
			width: innerWidth,
			height: halfHeight,
			scale: 1,
			ease: ease,
			opacity: 0,
			scale: 0,
			top: 0
		};
		const buttonFrom = { duration: 0, top: '40%', ease: ease, rotate: 90, scale: 0 };
		const headerFrom = {
			duration: 0,
			position: 'absolute',
			top: '40%',
			marginTop: 0,
			ease: ease,
			y: 0,
			opacity: 0
		};
		const textFrom = {
			duration: 0,
			scale: 0,
			width: '80%',
			position: 'absolute',
			top: '50%',
			overflowY: 'unset',
			opacity: 0
		};
		const linkFrom = {
			duration: 0,
			scale: 0,
			opacity: 1,
			bottom: 40,
			position: 'absolute',
			xPercent: -50,
			left: centerWidth
		};

		const backgroundTo = {
			duration: duration,
			background: 'linear-gradient(0deg, rgba(45, 45, 45, 1) 50%, rgb(45 45 45 / 0%) 100%)'
		};
		const buttonTo = { scale: 1, duration: duration };
		const imageTo = { duration: duration, scale: 1, opacity: 1 };

		const textTo = {
			duration: 0,
			scale: 1,
			opacity: 1
		};
		const headerTo = { opacity: 1, duration: duration };

		const linkTo = {
			duration: 0.1,
			scale: 1
		};

		const btn = childNodes[0].querySelector('.Project_card__background__btn-container');
		const header = childNodes[0].querySelector('.Project_card__background__header');
		const text = childNodes[0].querySelector('.Project_card__background__text');
		const link = childNodes[0].querySelector('.Project_card__background__link');

		this.mobileExpandAnimation = gsap.timeline({ paused: true, delay: delay });
		this.mobileExpandAnimation.to(current, cardTo);
		this.mobileExpandAnimation.to(childNodes[1], imageFrom, '<');
		this.mobileExpandAnimation.to(childNodes[0], backgroundFrom, '<');
		this.mobileExpandAnimation.to(btn, buttonFrom, '<');
		this.mobileExpandAnimation.to(header, headerFrom, '<');
		this.mobileExpandAnimation.to(text, textFrom, '<');
		this.mobileExpandAnimation.to(link, linkFrom, '<');

		this.mobileExpandAnimation.to(childNodes[0], backgroundTo);
		this.mobileExpandAnimation.to(btn, buttonTo, '<');
		this.mobileExpandAnimation.to(header, headerTo, '<');
		this.mobileExpandAnimation.to(childNodes[1], imageTo, '<');
		this.mobileExpandAnimation.to(text, textTo);
		this.mobileExpandAnimation.to(link, linkTo);
	};

	expandCardDesktop(expand) {
		expand ? this.desktopExpandAnimation.play() : this.desktopExpandAnimation.reverse();
	}

	expandCardMobile(expand) {
		// expand ? this.mobileExpandAnimation.play() : this.mobileExpandAnimation.reverse();
	}

	toggleImage = (slideUp) => {
		if (!WindowService.isBigDesktop() || this.state.expanded) {
			return;
		}
		const image = this.ref.current.childNodes[1];
		slideUp ? gsap.to(image, { duration: 0.3, top: '-90%' }) : gsap.to(image, { duration: 0.3, top: '-40%' });
	};

	followProjectLink = () => {
		window.open(this.props.link, '_blank');
	};

	componentDidMount() {
		this.createDesktopAnimation();
		// this.createMobileAnimation();
	}

	render() {
		return (
			<div
				ref={this.ref}
				className="Project_card"
				onMouseEnter={() => this.toggleImage(true)}
				onMouseLeave={() => this.toggleImage(false)}
			>
				<div className="Project_card__background">
					<p className="Project_card__background__text">{this.props.description}</p>

					<div className="Project_card__background__btn-container">
						<SeeMoreBtn onButtonClick={this.onButtonClick} />
					</div>

					<Header as="h3" className="Project_card__background__header">
						{this.props.header}
						<Header.Subheader>{this.props.subHeader}</Header.Subheader>
					</Header>

					<Button animated className="Project_card__background__link" onClick={this.followProjectLink}>
						<Button.Content visible>Visit project</Button.Content>
						<Button.Content hidden>
							<Icon name="arrow right" />
						</Button.Content>
					</Button>
				</div>
				<img className="Project_card__image " src={this.props.imageURL}></img>
			</div>
		);
	}
}

export default ProjectCard;
