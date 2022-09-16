/**
 * craco.config.js
 * Fix the problem path shortcut priority order
 * From now "@" will be the path for "./src" folder
 * Example: "../../component/Layout/index.js" would be "@/Layout/index.js" for now
 */

const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
};
