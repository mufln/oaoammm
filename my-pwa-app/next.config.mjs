const nextConfig = {
  /* config options here */
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5058/:path*',
            },
        ];
    },
    output: "standalone"
};

export default nextConfig;
