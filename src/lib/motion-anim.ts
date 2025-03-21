export const fadeInAnimationsVariants = {
	initial: {
		opacity: 0,
		y: 100,
	},

	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.07 * index,
			delay: 0.05 * index,
		},
	}),
};

export const animFromTopToBottom = {
	initial: {
		opacity: 0,
		y: -100,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
		},
	},
};

export const animFromBottomToTop = {
	initial: {
		opacity: 0,
		y: 250,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
		},
	},
};
