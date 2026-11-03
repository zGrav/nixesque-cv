import { useEffect, useRef } from 'react';

const MAX_WAIT_MS = 30000;

/** Plays a clip and calls `onEnd` once it has finished (or cannot be played, e.g. autoplay blocked). */
const AudioClip = ({ src, volume = 0.3, onEnd }) => {
	const onEndRef = useRef(onEnd);

	useEffect(() => { onEndRef.current = onEnd; });

	useEffect(() => {
		const audio = new Audio(src);
		audio.volume = volume;

		let finished = false;
		const finish = () => {
			if (finished) return;
			finished = true;
			onEndRef.current?.();
		};

		audio.addEventListener('ended', finish);
		audio.addEventListener('error', finish);
		const fallback = setTimeout(finish, MAX_WAIT_MS);
		audio.play().catch(finish);

		return () => {
			finished = true;
			clearTimeout(fallback);
			audio.pause();
		};
	}, [src, volume]);

	return null;
};

export default AudioClip;
