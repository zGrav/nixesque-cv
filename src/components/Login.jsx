import { Sequence, Typing } from './Typing';

const blue = { color: '#4286f4' };

const Login = ({ onDone }) => (
	<Sequence onDone={onDone}>
		<Sequence className="row">
			<Typing style={blue}>Username:</Typing>
			<Typing cursor speed={200} delay={1000}>guest</Typing>
		</Sequence>
		<Sequence className="row">
			<Typing style={blue} delay={800}>Password:</Typing>
			<Typing cursor speed={200} delay={500}>**********</Typing>
		</Sequence>
		<Typing as="div" style={{ color: '#0f0' }} delay={1500}>Login Successful!</Typing>
		<Typing as="p" delay={500}>Welcome! The MOTD is the following:</Typing>
		<Typing as="p" speed={20} delay={500}>Hello Guest, hope you enjoy my personal approach to a digital CV :)</Typing>
		<Typing as="p" delay={1000}>Grabbing a shell!</Typing>
	</Sequence>
);

export default Login;
