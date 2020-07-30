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
		gsap.to(btn, { opacity: 0 });
		setTimeout(() => {
			btn.style.pointerEvents = 'all';
			gsap.to(btn, { opacity: 1 });
		}, 1500);
	};

	onButtonClick = () => {
		const expanded = !this.state.expanded;
		this.setState({ expanded: expanded });

		const isBigDesktop = WindowService.isBigDesktop();
		isBigDesktop ? this.expandCardDesktop(expanded) : this.expandCardMobile(expanded);
		this.props.onButtonClick(this.ref.current);
		if (!expanded) {
			this.throttleAnimationSpam();
		}
	};

	createDesktopExpandAnimation() {
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
			height: 450,
			width: 550,
			xPercent: 30,
			scale: 1,
			ease: ease,
			top: '-40%'
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
		this.desktopExpandAnimation.to(link, textStyle);
	}

	expandCardDesktop(expand) {
		expand ? this.desktopExpandAnimation.play() : this.desktopExpandAnimation.reverse();
	}

	expandCardMobile(expand) {
		console.log('mobile');
	}

	toggleImage = (slideUp) => {
		if (!WindowService.isBigDesktop() || this.state.expanded) {
			return;
		}
		const image = this.ref.current.childNodes[1];
		slideUp ? gsap.to(image, { duration: 0.3, top: '-90%' }) : gsap.to(image, { duration: 0.3, top: '-40%' });
	};

	followProjectLink = () => {
		const link = 'mailto:marcus.pousette@mmrsolutions.se';

		window.open(this.props.link, '_blank');
	};

	componentDidMount() {
		this.createDesktopExpandAnimation();
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

					<Button animated className="Project_card__background__link">
						<Button.Content visible>Visit project</Button.Content>
						<Button.Content hidden onClick={this.followProjectLink}>
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
