import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AudioClip from './components/AudioClip';
import Boot from './components/Boot';
import BootupArt from './components/BootupArt';
import Login from './components/Login';
import Shell from './components/Shell';
import { Stages, setStage } from './store';

const PAUSE_MS = 1000;

const Splash = ({ onDone }) => {
	useEffect(() => {
		const timer = setTimeout(onDone, PAUSE_MS);
		return () => clearTimeout(timer);
	}, [onDone]);
	return null;
};

const Nix = () => {
	const dispatch = useDispatch();
	const { stage, isMobile } = useSelector((state) => state.app);
	const goTo = (next) => () => { dispatch(setStage(next)); };
	const toLogin = goTo(Stages.LOGIN);
	// let the finished output sit for a moment before switching screens
	const goToLater = (next) => () => { setTimeout(goTo(next), PAUSE_MS); };

	if (stage === Stages.CHAIR_AUDIO) {
		return <AudioClip src="https://zgrav.pro/chair.mp3" onEnd={goTo(Stages.BOOTUP)} />;
	}

	return (
		<div className="container">
			<div className="screen">
				<BootupArt glow={stage !== Stages.BOOTUP} />
				{stage === Stages.BOOTUP && <Boot isMobile={isMobile} onDone={goToLater(Stages.SPLASH)} />}
				{stage === Stages.SPLASH && <Splash onDone={toLogin} />}
				{stage === Stages.LOGIN && <Login onDone={goToLater(Stages.SHELL)} />}
				{stage === Stages.SHELL && <Shell />}
			</div>
			{stage === Stages.BOOTUP && <div className="overlay">VGA</div>}
		</div>
	);
};

export default Nix;
