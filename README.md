# TREKO Places Expo App
## Starter checklist:
- Install Node.js [click here](https://nodejs.org/en)
- Install yarn for package management
    npm install --global yarn
- XCode required for iOS simulator
- Android Studio required for Android Simulator
- Create an Expo account [click here](https://expo.dev/signup)
- Create a GitHub account [click here](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home)

## Initial setup
1. Create Expo project
    - ```npx create-expo-app --template```
    - ```select Blank (Typescript)```
    - ```enter app name```
2. Run development server to ensure everything is properly installed and running
    - ```yarn start```
    - ```yarn ios```
3. Install gluestack dependencies
   - ```yarn add @gluestack-ui/themed react-native-svg@13.4.0```
4. Add GluestackUIProvider to the root of app ```App.tsx```
    ```javascript
    import { StyleSheet } from "react-native";
    import { GluestackUIProvider, Text, Box, config } from "@gluestack-ui/themed";
    export default function App() {
        return (
            <GluestackUIProvider config={config.theme}>
                <Box style={styles.container}>
                    <Text>Open up App.js to start working on your app!</Text>
                </Box>
            </GluestackUIProvider>
        );
    }
    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        },
    });
    ```

## EAS Update
> EAS Update is a hosted service that serves updates for projects using the expo-updates library.
> 
> EAS Update makes fixing small bugs and pushing quick fixes a snap in between app store submissions. It accomplishes this by allowing an end-user's app to swap out the non-native parts of their app (for example, JS, styling, and image changes) with a new update that contains bug fixes and other updates.

### Install latest EAS CLI
```npm install --global eas cli```
### Log in to Expo accout
```eas login```
### Publish an update
```eas update --branch [branch] --message [message]``` 
``` 
    #example 
    eas update --branch preview --message "Updating the app"
```

## Collaborating with Git
### Clone repository
Git documentation and reference can be found [here](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
- Open terminal, enter ```git clone https://github.com/johnApale/treko-places-expo.git```

### Branching and Merging
Git documentation on branching and merging can be found [here](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
#### Branching
##### Switch to new branch "feature-name"
```
    git checkout -b [feature-name]
```
##### **NOTE**: Branch names should be formatted as username/feature-name or username/issue-number
##### Example:
```
    git checkout -b johnApale/home-screen
```
```
    git checkout -b johnApale/issue-1
```
#### Commiting changes within branch
##### Add all newly added files to the working tree
```
    git add .
```
##### Commit the changes to the branch
```
    git commit -m [Commit message]
```
#### Merging
##### Switch to 'main' branch
```
    git checkout main
```
##### Merge to the feature worked on with main branch
```
    git merge [feature-name]
```
##### Update the remote repo
```
    git push
```
