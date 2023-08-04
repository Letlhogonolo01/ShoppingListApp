import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";

import store from "./redux/store";
import Home from "./Screens/Home";
import Details from "./Screens/Details";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./components/Loader";

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 1000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("Home");
        } else {
          setInitialRouteName("LoginScreen");
        }
      } else {
        setInitialRouteName("RegistrationScreen");
      }
    } catch (error) {
      setInitialRouteName("RegistrationScreen");
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        {!initialRouteName ? (
          <Loader visible={true} />
        ) : (
          <>
            <Stack.Navigator
              initialRouteName={initialRouteName}
              screenOptions={{ headerShown: true }}
            >
              <Stack.Screen
                name="RegistrationScreen"
                component={RegistrationScreen}
              />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Detail" component={Details} />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
