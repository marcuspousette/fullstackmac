import React from 'react';
import ReactDOM from 'react-dom';
import HttpsRedirect from 'react-https-redirect';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
	<React.StrictMode>
		<HttpsRedirect>
			<App />
		</HttpsRedirect>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
