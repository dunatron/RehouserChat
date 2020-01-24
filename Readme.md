# RehouserChat

This is the RehouserChat project

## React Native/Expo tutorial

- https://www.youtube.com/watch?v=qSRrxpdMpVc
- [Leading Material library for reqact-native](https://github.com/xinthink/react-native-material-kit)

## Installing Navigation

- The guide is found [here](https://reactnavigation.org/docs/en/getting-started.html)
- Once the project is initialized, in the project directory run `expo install react-navigation react-native-gesture-handler react-native-reanimated react-native-screens`
- yarn add react-navigation
- expo install react-native-gesture-handler react-native-reanimated

## Debugging adding module

- this may be related to github issue https://github.com/facebook/react-native/issues/4968
  1. clear watchman watches: `watchman watch-del-all`
  2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`
  3. reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`
  4. remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`

## react-native/expo with react navigation with Apollo

- Debug Links: https://github.com/apollographql/react-apollo/issues/3361
- these guys have the answer [here](https://github.com/dai-shi/typescript-expo-apollo-boilerplate/blob/master/src/App.tsx)
- try this [here](https://blog.axlight.com/posts/clean-expo-react-native-react-apollo-graphql-typescript-boilerplate/)

## Open debugger

- open "rndebugger://set-debugger-loc?host=localhost&port=19002"
- Expo DevTools is running at http://localhost:19002

## Local Development

- For local development we connect to an emulator so for the localhost we will need to find our machines
- type ipconfig to find your machines local ip.
- your uri will then look like this for your apollo client in local development
  - uri: "http://10.110.6.22:4444"

## get GraphQL enum values

```js
query GET_ENUM($name:String!) {
  __type(name:$name) {
    enumValues {
      name
      description
    }
  }
}
// variables
{
  "name": "IndoorFeature"
}
```

## Cheat sheets

- [keyboardTypes](https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options/)
- [react-native-material-textfield](https://github.com/n4kz/react-native-material-textfield)
- [Fantastic Formic Docs](https://jaredpalmer.com/formik/docs/api/fieldarray)
- [formik field array best practises](https://jaredpalmer.com/formik/docs/api/fieldarray)
- [Formik example, just remember onClick => onPress 😜](https://codesandbox.io/s/formik-fieldarray-materialui-f7rkz?from-embed)

## External Bugs

- react-native-image-picker
  1. Downgrade to version "react-native-image-picker": "0.28.0",(in package.json)
  2. Install library using npm install
  3. Link using `react-native link react-native-image-picker`
  4. Do pod install inside ios folder
