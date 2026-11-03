import { useEffect, useState } from 'react';

import AudioClip from './AudioClip';
import { Sequence, Typing } from './Typing';

const bootLines = [
	'[  OK  ] Started Show Boot Screen.',
	'[  OK  ] Found device OS_PATA.',
	'Starting File System Check on /dev/disk/by-name/OS_PATA...',
	'[  OK  ] Started File System Check on /dev/disk/by-name/OS_PATA.',
	'Welcome to zGravOS!',
	'Mounting core system points...',
	'[  OK  ] Mounted /boot/grub2/x86_64-efi.',
	'[  OK  ] Mounted /opt.',
	'[  OK  ] Mounted /srv.',
	'[  OK  ] Mounted /tmp.',
	'[  OK  ] Mounted /usr/local.',
	'[  OK  ] Mounted /var/log.',
	'[  OK  ] Mounted /var/opt.',
	'[  OK  ] Mounted /var/tmp.',
	'[  OK  ] Mounted /.snapshots.',
	'[  OK  ] Started Authorization Manager.',
	'[  DONE  ] System Init Complete!',
];

const Line = ({ line, onDone }) => {
	const status = ['OK', 'DONE'].find((s) => line.includes(s));
	let content = <span style={{ color: '#f0f' }}>{line}</span>;

	if (status) {
		const [before, after] = line.split(status);
		content = <>{before}<span style={{ color: status === 'OK' ? '#0f0' : '#4286f4' }}>{status}</span>{after}</>;
	} else if (line.includes('Welcome')) {
		content = <span style={{ color: '#ff0' }}>{line}</span>;
	}

	return <Typing as="div" speed={25} delay={line.startsWith('[') ? 250 : 400} onDone={onDone}>{content}</Typing>;
};

/** Shows the boot log once the power-on sound (if any) has finished playing. */
const Boot = ({ isMobile, onDone }) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (!isMobile) return undefined;
		const timer = setTimeout(() => setReady(true), 5000);
		return () => clearTimeout(timer);
	}, [isMobile]);

	return (
		<>
			{isMobile ? <p>Sadly on phone, there is no SFX :(</p> : <AudioClip src="https://zgrav.pro/poweron.mp3" onEnd={() => setReady(true)} />}
			{ready ? (
				<Sequence onDone={onDone}>
					{bootLines.map((line) => <Line key={line} line={line} />)}
				</Sequence>
			) : null}
		</>
	);
};

export default Boot;
