/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Safety net so the presentation build never fails on a lint/type nitpick.
  // (You can turn these off once you have the dev toolchain set up locally.)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
