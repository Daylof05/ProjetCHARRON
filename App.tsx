import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ConnexionScreen from './components/ConnexionScreen';
import Activites from './components/Activites';
import { auth } from './services/Firebase';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsUserLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Connexion'>
        <Tab.Screen name='Connexion' component={ConnexionScreen}/>
        {isUserLoggedIn && <Tab.Screen name='Activites' component={Activites} />}
        {/* <Tab.Screen name='Activites' component={Activites}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;