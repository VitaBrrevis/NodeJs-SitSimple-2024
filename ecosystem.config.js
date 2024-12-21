module.exports = {
  apps: [
    {
      name: 'SitSimple',
      script: 'dist/main.js', // Path to your main file
      instances: 'max', // Or a specific number of instances
      exec_mode: 'cluster', // Or 'fork' for single instance
      env: {
        NODE_ENV: 'development',
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        SUPABASE_URL: process.env.SUPABASE_URL,
      },
    },
  ],
};