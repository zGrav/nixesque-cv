const lines = [
	'     _____                 _____ _____',
	'    |  __ \\               |  _  /  ___|',
	' ___| |  \\/_ __ __ ___   _| | | \\ `--.',
	'|_  / | __| \'__/ _` \\ \\ / / | | |`--. \\',
	' / /| |_\\ \\ | | (_| |\\ V /\\ \\_/ /\\__/ /',
	'/___|\\____/_|  \\__,_| \\_/  \\___/\\____/',
];

const randomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;

const colors = lines.map(randomColor);

const BootupArt = ({ glow }) => (
	<pre id="bootup_art" className={glow ? 'shadow' : undefined}>
		{lines.map((line, i) => (
			<code key={line} style={{ color: colors[i] }}>{line}{'\n'}</code>
		))}
		{'\n\n'}
	</pre>
);

export default BootupArt;
