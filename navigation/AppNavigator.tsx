import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import * as Linking from 'expo-linking';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AccountsScreen from '../screens/AccountsScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import InvestmentsScreen from '../screens/InvestmentsScreen';
import InstallmentsScreen from '../screens/InstallmentsScreen';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['https://uangq.vercel.app', Linking.createURL('/')],
  config: {
    screens: {
      UpdatePassword: 'update-password',
    },
  },
};

export default function AppNavigator() {
  const { session, initialized } = useAuth();

  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session && session.user ? (
          // Authenticated Screens
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
            <Stack.Screen name="Accounts" component={AccountsScreen} />
            <Stack.Screen name="Transactions" component={TransactionsScreen} />
            <Stack.Screen name="Investments" component={InvestmentsScreen} />
            <Stack.Screen name="Installments" component={InstallmentsScreen} />
          </>
        ) : (
          // Auth Screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
