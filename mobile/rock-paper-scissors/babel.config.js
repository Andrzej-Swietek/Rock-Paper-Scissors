module.exports = function(api) {
  api.cache(true);
  return {
      presets: ['babel-preset-expo'],
      plugins: [
          [
              "module-resolver",
              {
                  alias: {
                      "shared": "./src/shared",
                      "screens": "./src/screens",
                      "navigation": "./src/navigation",
                      "components": "./src/components",
                      "hooks": "./src/shared/hooks"
                  },
              },
          ],
          ["module:react-native-dotenv", {
              "moduleName": "@env",
              "path": ".env",
              "blacklist": null,
              "whitelist": null,
              "safe": false,
              "allowUndefined": true
          }],
          'react-native-reanimated/plugin',
      ]
  };
};