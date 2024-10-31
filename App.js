import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import WaterQualityAlerts from './components/WaterQualityAlerts';
import WaterQualityFeedback from './components/WaterQualityFeedback';
import EducationalContent from './components/EducationalContent';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'WeWater' }} />
        <Stack.Screen name="Water Quality Alerts" component={WaterQualityAlerts} />
        <Stack.Screen name="Water Quality Feedback" component={WaterQualityFeedback} />
        <Stack.Screen name="Educational Content" component={EducationalContent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;