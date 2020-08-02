import React from 'react';
import './ContactMeBtn.scss';

function mailMe() {
	const mailAdress = 'mailto:marcus.pousette@mmrsolutions.se';
	window.location.href = mailAdress;
}

function ContactMe(props) {
	return (
		<button className="Contact_me__contact" onClick={mailMe}>
			<span>Get in touch</span>
		</button>
	);
}

export default ContactMe;
