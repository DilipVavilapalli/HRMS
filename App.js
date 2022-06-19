import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './app/screen/Splash'
import Home from './app/screen/Home'
import SignUp from './app/screen/SignUp'
import UserLogin from './app/screen/UserLogin'
import UserDash from './app/screen/UserDash'
import Admin from './app/screen/Admin'
import AdminBoard from './app/screen/AdminBoard'
import AdminView from './app/screen/AdminView'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="UserLogin" component={UserLogin} options={{ headerShown: false }} />
        <Stack.Screen name="UserDash" component={UserDash} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
        <Stack.Screen name="AdminBoard" component={AdminBoard} options={{ headerShown: false }} />
        <Stack.Screen name="AdminView" component={AdminView} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
