module.exports = function override(config, env) {
    config.externals = {
        ...config.externals,
        crypto: "crypto-browserify",
    };

    return config;
};
