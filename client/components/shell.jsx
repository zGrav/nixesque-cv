import React from 'react';

import Typing from 'react-typing-animation';

import Cursor from './cursor';

function checkIfMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const Shell = () => {
	return (
		<div>
			<span>
				Last login: unknown
			</span>
			<br />
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<Typing hideCursor speed={-1}>
					<span style={{ color: '#4286f4' }}>
						guest@hal9000:~$
					</span>
				</Typing>
				<Typing cursor={<Cursor />} speed={200} startDelay={1000}>
					<span>
						&nbsp;ls -la
					</span>
				</Typing>
			</div>
			<div>
				<Typing hideCursor speed={-1} startDelay={3500}>
					<p>total 3</p>
					<p>drwx------   7 guest guest   4096 Okt 28 11:01 .</p>
					<p>drwx------   7 guest guest   4096 Okt 28 11:01 ..</p>
					<p>-rwxrwxrwx   1 zgrav zgrav   128000 Okt 28 18:14 whoiszgrav.txt</p>
				</Typing>
			</div>
			<br />
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<Typing hideCursor speed={-1} startDelay={11000}>
					<span style={{ color: '#4286f4' }}>
						guest@hal9000:~$
					</span>
				</Typing>
				<Typing cursor={<Cursor />} speed={200} startDelay={11500}>
					<span>
						&nbsp;cat whoiszgrav.txt
					</span>
				</Typing>
			</div>
			<div>
				<Typing hideCursor speed={-1} startDelay={16000}>
					<br />
					<p>
						Why, I'm very glad you're curious about who I am :)
					</p>
					<p>
						You may be wondering why I built this page? Simple answer, I was bored and decided to do something cool.
					</p>
					<p>
						<span style={{ color: '#ffff00' }}>
							Hey, I'm David Silva aka z/zGrav. {new Date().getFullYear() - 1994} y/o Portuguese that somehow ended up in IT and I am having the time of my life.
						</span>
					</p>
					<p>
						I play videogames from time to time and code... like a lot.
					</p>
					<p>
						If you want to have a chat, feel free to hit me up on my email or Twitter for example. Here is my email <a href="mailto:me@zgrav.pro" style={{ color: "#0bc" }}>me@zgrav.pro</a> and handle: <a href="https://twitter.com/notzGrav" style={{ color: "#0bc" }} target="_blank">@notzGrav</a>
					</p>
					<p>
						I also have my legacy "digital-cv" still up which you can check out here: <a href="https://zgrav.pro/index_old.html" style={{ color: "#0bc" }} target="_blank">OLDIE</a>
					</p>
				</Typing>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<Typing hideCursor speed={-1} startDelay={checkIfMobile() ? 46000 : 42500}>
					<span style={{ color: '#4286f4' }}>
						guest@hal9000:~$
					</span>
				</Typing>
				<Typing cursor={<Cursor />} speed={200} startDelay={checkIfMobile() ? 48000 : 43000}>
					<span>
						&nbsp;logout
					</span>
				</Typing>
			</div>
			<div>
				<Typing hideCursor speed={-1} startDelay={checkIfMobile() ? 50000 : 45000}>
					<p>
						Connection to hal9000.zgrav.pro closed.
					</p>
				</Typing>
			</div>
		</div>
	);
};

export default Shell;
