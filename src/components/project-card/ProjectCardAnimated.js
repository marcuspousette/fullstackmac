import React from 'react';
import gsap from 'gsap';
import { Header, Button, Icon } from 'semantic-ui-react';
import WindowService from '../../api/service/WindowService';
import SeeMoreBtn from '../see-more-btn/SeeMoreBtn.js';
import './ProjectCardAnimated.scss';

class ProjectCardAnimated extends React.Component {
	constructor(props) {
		super(props);
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
		const isBigDesktop = WindowService.isBigDesktop();
		if (isBigDesktop) {
			return;
		}
		this.props.onButtonClick(this);
	};

	followProjectLink = () => {
		window.open(this.props.link, '_blank');
	};

	componentDidMount() {}

	render() {
		return (
			<div ref={this.ref} className="Project_card_animated">
				<div className="Project_card_animated__background">
					<p className="Project_card_animated__background__text">{this.props.description}</p>

					<div className="Project_card_animated__background__btn-container">
						<SeeMoreBtn onButtonClick={this.onButtonClick} />
					</div>

					<Header as="h3" className="Project_card_animated__background__header">
						{this.props.header}
						<Header.Subheader>{this.props.subHeader}</Header.Subheader>
					</Header>

					<Button
						animated
						className="Project_card_animated__background__link"
						onClick={this.followProjectLink}
					>
						<Button.Content visible>Visit project</Button.Content>
						<Button.Content hidden>
							<Icon name="arrow right" />
						</Button.Content>
					</Button>
				</div>
				<img className="Project_card_animated__image " src={this.props.imageURL} alt={this.props.header}></img>
			</div>
		);
	}
}

export default ProjectCardAnimated;
