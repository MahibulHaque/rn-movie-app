import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TabNavigator from './src/navigator/TabNavigator';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

interface AppProps {}

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = (props: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{animation: 'default'}}
          />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetailScreen}
            options={{animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="SeatBooking"
            component={SeatBookingScreen}
            options={{animation: 'slide_from_bottom'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
