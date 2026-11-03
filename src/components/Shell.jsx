import { Sequence, Typing } from './Typing';

const blue = { color: '#4286f4' };
const link = { color: '#0bc' };

const Prompt = ({ command, delay, onDone }) => (
	<Sequence className="row" onDone={onDone}>
		<Typing style={blue} delay={delay}>guest@hal9000:~$</Typing>
		<Typing cursor speed={200} delay={500}>{command}</Typing>
	</Sequence>
);

const Shell = () => (
	<Sequence>
		<Typing as="div" speed={30}>Last login: unknown</Typing>
		<Prompt command="ls -la" delay={500} />
		<Typing as="div" speed={30} delay={500}>total 3</Typing>
		<Typing as="div" speed={30} delay={300}>drwx------   7 guest guest   4096 Okt 28 11:01 .</Typing>
		<Typing as="div" speed={30} delay={300}>drwx------   7 guest guest   4096 Okt 28 11:01 ..</Typing>
		<Typing as="div" speed={30} delay={300}>-rwxrwxrwx   1 zgrav zgrav   128000 Okt 28 18:14 whoiszgrav.txt</Typing>
		<Prompt command="cat whoiszgrav.txt" delay={1500} />
		<Typing as="p" speed={40} delay={500}>Why, I&apos;m very glad you&apos;re curious about who I am :)</Typing>
		<Typing as="p" speed={40}>You may be wondering why I built this page? Simple answer, I was bored and decided to do something cool.</Typing>
		<Typing as="p" speed={40} style={{ color: '#ff0' }}>
			Hey, I&apos;m David Silva aka z/zGrav. {new Date().getFullYear() - 1994} y/o Portuguese that somehow ended up in IT and I am having the time of my life.
		</Typing>
		<Typing as="p" speed={40}>I play videogames from time to time and code... like a lot.</Typing>
		<Typing as="p" speed={40}>
			If you want to have a chat, feel free to hit me up on my email or Twitter for example. Here is my email <a href="mailto:me@zgrav.pro" style={link}>me@zgrav.pro</a> and handle: <a href="https://twitter.com/notzGrav" style={link} target="_blank" rel="noopener noreferrer">@notzGrav</a>
		</Typing>
		<Typing as="p" speed={40}>
			I also have my legacy &quot;digital-cv&quot; still up which you can check out here: <a href="https://zgrav.pro/index_old.html" style={link} target="_blank" rel="noopener noreferrer">OLDIE</a>
		</Typing>
		<Prompt command="logout" delay={2000} />
		<Typing as="div" speed={30} delay={500}>Connection to hal9000.zgrav.pro closed.</Typing>
	</Sequence>
);

export default Shell;
