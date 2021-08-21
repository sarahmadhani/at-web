module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 10
            }
        }]
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties'
    ],
    env: {
        development: {
            sourceMaps: 'inline',
            plugins: ['source-map-support']
        }
    },
    comments: false
}