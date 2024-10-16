/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard',
          permanent: true, // o false si no quieres que sea permanente
        },
      ];
    },
  }
  
  export default nextConfig;
  