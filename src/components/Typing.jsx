import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';

const countChars = (node) => {
	if (typeof node === 'string' || typeof node === 'number') return String(node).length;
	if (Array.isArray(node)) return node.reduce((sum, child) => sum + countChars(child), 0);
	if (isValidElement(node)) return countChars(node.props.children);
	return 0;
};

// Returns the first `budget` characters of a node tree, keeping the element structure intact.
const slice = (node, budget) => {
	if (typeof node === 'string' || typeof node === 'number') {
		const text = String(node);
		return [text.slice(0, budget), Math.min(text.length, budget)];
	}
	if (isValidElement(node)) {
		const [children, used] = slice(Children.toArray(node.props.children), budget);
		return [cloneElement(node, undefined, children), used];
	}
	if (Array.isArray(node)) {
		let left = budget;
		const out = [];
		for (const child of node) {
			if (left <= 0) break;
			const [sliced, used] = slice(child, left);
			out.push(sliced);
			left -= used;
		}
		return [out, budget - left];
	}
	return [null, 0];
};

/**
 * Types out its children character by character (speed in ms per char, 0 = instantly)
 * and calls `onDone` once everything has been drawn.
 */
export const Typing = ({ children, as: Tag = 'span', speed = 0, delay = 0, cursor = false, className, style, onDone }) => {
	const total = countChars(children);
	const [shown, setShown] = useState(0);
	const onDoneRef = useRef(onDone);

	useEffect(() => { onDoneRef.current = onDone; });

	useEffect(() => {
		let timer;
		const finish = () => {
			setShown(total);
			onDoneRef.current?.();
		};
		const step = (n) => {
			if (n >= total) finish();
			else {
				setShown(n);
				timer = setTimeout(() => step(n + 1), speed);
			}
		};
		timer = setTimeout(() => (speed > 0 ? step(1) : finish()), delay);
		return () => clearTimeout(timer);
	}, [total, speed, delay]);

	const done = shown >= total;
	const content = done ? children : slice(Children.toArray(children), shown)[0];

	return (
		<Tag className={className} style={style}>
			{content}
			{cursor && !done ? <span className="cursor">|</span> : null}
		</Tag>
	);
};

/**
 * Renders its children one after another: a child is only mounted once the
 * previous one has called `onDone`. Children must be `Typing` or `Sequence`.
 */
export const Sequence = ({ children, as: Tag = 'div', className, style, onDone }) => {
	const items = Children.toArray(children);
	const [index, setIndex] = useState(0);
	const onDoneRef = useRef(onDone);

	useEffect(() => { onDoneRef.current = onDone; });

	const advance = () => setIndex((i) => i + 1);

	useEffect(() => {
		if (index === items.length) onDoneRef.current?.();
	}, [index, items.length]);

	return (
		<Tag className={className} style={style}>
			{items.slice(0, index + 1).map((child, i) => (
				i === index ? cloneElement(child, { onDone: advance }) : child
			))}
		</Tag>
	);
};
