/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

// // module.exports = {
// //     webpack5: true,
// //     webpack: (config) => {
// //       config.resolve.fallback = { fs: false };
  
// //       return config;
// //     },
// //   };

// next.config.js

module.exports = {
    webpack: (config, {isServer}) => {
        config.resolve.fallback = { fs: false, path: false };
        // if (!isServer) {
        //     config.resolve.fallback = {
        //       ...config.resolve.fallback,
        //       "stream": require.resolve("stream-browserify"),
        //     };
        // }
        return config;
    },
    env: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
        NEXT_PUBLIC_CLERK_SIGN_IN_URL:process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_SIGN_UP_URL:process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
        DATABASE_URL:process.env.DATABASE_URL,
        NEXT_PUBLIC_S3_PUBLIC_ACCESS_KEY_ID:process.env.NEXT_PUBLIC_S3_PUBLIC_ACCESS_KEY_ID,
        NEXT_PUBLIC_S3_SECRET_ACCESS_KEY:process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
        NEXT_PUBLIC_S3_BUCKET_NAME:process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        PINECONE_ENVIRONMENT:process.env.PINECONE_ENVIRONMENT,
        PINECONE_API_KEY:process.env.PINECONE_API_KEY,
        OPENAI_API_KEY:process.env.OPENAI_API_KEY
    }
};



