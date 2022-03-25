module.exports = () => ({
    plugins: [["postcss-preset-env", { minimumVendorImplementations: 3, browsers: ">0.1%" }]],
});
