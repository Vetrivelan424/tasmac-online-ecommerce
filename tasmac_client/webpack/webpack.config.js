const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = (envVars) => {
  const { env, webenv } = envVars;
  console.log('envVars',envVars)
  // Load appropriate webpack configuration based on the env variable
  const envConfig = require(`./webpack.${webenv}.js`);
  const config = merge(commonConfig, envConfig);

  // Add Dotenv plugin to load environment variables from corresponding env file
  config.plugins.push(
    new Dotenv({
      path: `./environments/.env.${env}`
    })
  );

  return config;
};
