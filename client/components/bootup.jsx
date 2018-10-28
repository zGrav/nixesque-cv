import React from 'react';

import Typing from 'react-typing-animation';

const generateRandomHexColor = () => {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export const BootupArt = () => {
	return (
		<pre id='bootup_art'>
			<code style={{ color: generateRandomHexColor() }}>
				{`     _____                 _____ _____`}
			</code>
			<br />
			<code style={{ color: generateRandomHexColor() }}>
				{`    |  __ \\               |  _  /  ___|`}
			</code>
			<br />
			<code style={{ color: generateRandomHexColor() }}>
				{` ___| |  \\/_ __ __ ___   _| | | \\ \`--.`}
			</code>
			<br />
			<code style={{ color: generateRandomHexColor() }}>
				{`|_  / | __| '__/ _\` \\ \\ / / | | |\`--. \\`}
			</code>
			<br />
			<code style={{ color: generateRandomHexColor() }}>
				{` / /| |_\\ \\ | | (_| |\\ V /\\ \\_/ /\\__/ /`}
			</code>
			<br />
			<code style={{ color: generateRandomHexColor() }}>
				{`/___|\\____/_|  \\__,_| \\_/  \\___/\\____/`}
			</code>
			<br />
			<code>
				{`                                       `}
			</code>
			<br />
			<code>
				{`                                       `}
			</code>
			<br />
		</pre>
	);
};

export const BootupText = (dispatch, doneTyping, lines) => {
	return (
		<Typing hideCursor onFinishedTyping={() => doneTyping(dispatch)} speed={-1} startDelay={5000}>
			{lines.map((line, index) => {
				if (line.indexOf('OK') > -1) {
					const splitted = line.split('OK');
					return (
						<p key={'line' + index}>
							{splitted[0]}
							<span style={{ color: '#0f0' }}>
								OK
							</span>
							<span>
								{splitted[1]}
							</span>
						</p>
					);
				}

				if (line.indexOf('DONE') > -1) {
					const splitted = line.split('DONE');
					return (
						<p key={'line' + index}>
							{splitted[0]}
							<span style={{ color: '#4286f4' }}>
								DONE
							</span>
							<span>
								{splitted[1]}
							</span>
						</p>
					);
				}

				if (line.indexOf('Welcome') > -1) {
					return (
						<p key={'line' + index} style={{ color: '#ffff00' }}>
							{line}
						</p>
					)
				}

				return (
					<p key={'line' + index} style={{ color: '#f0f' }}>
						{line}
					</p>
				);
			})}
		</Typing>
	);
};
