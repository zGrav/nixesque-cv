import React from 'react';

import Typing from 'react-typing-animation';

import Cursor from './cursor';

const Login = (dispatch, doneLoginTyping) => {
	return (
		<div>
			<Typing hideCursor speed={-1}>
				<span style={{ color: '#4286f4' }}>
					Username:
				</span>
			</Typing>
			<Typing cursor={<Cursor />} speed={200} startDelay={1000}>
				<span>
					guest
				</span>
			</Typing>
			<br />
			<Typing hideCursor speed={-1} startDelay={3000}>
				<span style={{ color: '#4286f4' }}>
					Password:
				</span>
			</Typing>
			<Typing cursor={<Cursor />} speed={200} startDelay={3500}>
				<span>**********</span>
			</Typing>
			<br />
			<br />
			<Typing hideCursor speed={-1} startDelay={8000}>
				<span style={{ color: '#0f0' }}>
					Login Successful!
				</span>
				<p>
					Welcome! The MOTD is the following:
				</p>
				<p>
					Hello Guest, hope you enjoy my personal approach to a digital CV :)
				</p>
			</Typing>
			<br />
			<Typing hideCursor onFinishedTyping={() => doneLoginTyping(dispatch)} speed={-1} startDelay={10000}>
				<p>
					Grabbing a shell!
				</p>
			</Typing>
		</div>
	);
};

export { Login };
