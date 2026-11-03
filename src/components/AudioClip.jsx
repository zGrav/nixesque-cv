import { useEffect, useRef } from 'react';

const MAX_WAIT_MS = 30000;

/**
 * Plays a clip and calls `onEnd` once it has finished or failed to load.
 * `onBlocked` is called first if the browser refuses to play it (autoplay policy); `onEnd` follows.
 */
const AudioClip = ({ src, volume = 0.3, onEnd, onBlocked }) => {
	const onEndRef = useRef(onEnd);
	const onBlockedRef = useRef(onBlocked);

	useEffect(() => {
		onEndRef.current = onEnd;
		onBlockedRef.current = onBlocked;
	});

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
		audio.play().catch(() => {
			if (!finished) onBlockedRef.current?.();
			finish();
		});

		return () => {
			finished = true;
			clearTimeout(fallback);
			audio.pause();
		};
	}, [src, volume]);

	return null;
};

export default AudioClip;
