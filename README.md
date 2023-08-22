# TREKO Places Expo App
## Pre-checklist:
- Install Node.js
- Install yarn for package management
    npm install --global yarn
- XCode required for iOS simulator
- Android Studio required for Android Simulator

## Getting Started
1. Create Expo project
    - ```npx create-expo-app --template```
    - ```select Blank (Typescript)```
    - ```enter app name```
2. Run development server to ensure everything is properly installed and running
    - ```yarn start```
    - ```yarn ios```
3. Install gluestack dependencies
   - ```yarn add @gluestack-ui/themed react-native-svg@13.4.0```
4. Add GluestackUIProvider to the root of app (App.tsx)
