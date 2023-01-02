import { withContentlayer } from "next-contentlayer";
import BundleAnalyzer from "@next/bundle-analyzer";

export const basePath = "";

/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: basePath,
	reactStrictMode: true,
	swcMinify: true,
	trailingSlash: true,
	webpack: (config) => {
		Object.assign(config.experiments, {
			topLevelAwait: true,
		});
		return config;
	},
};

const withBundleAnalyzer = BundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
	openAnalyzer: false,
});

export default withBundleAnalyzer(withContentlayer(nextConfig));
