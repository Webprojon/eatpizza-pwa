import withPWA from "next-pwa";

const nextConfig = {
	// distDir: 'build',
	reactStrictMode: true,
	//swcMinify: true,
	compiler: {
		removeConsole: process.env.NODE_ENV !== "development",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
};

export default withPWA({
	dest: "public",
	register: true,
	skipWaiting: true,
	buildExcludes: [/app-build-manifest.json$/],
})(nextConfig);
