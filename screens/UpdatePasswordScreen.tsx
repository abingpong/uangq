import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LockKeyhole } from 'lucide-react-native';

export default function UpdatePasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function updatePassword() {
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Password has been successfully updated!');
      navigation.navigate('Dashboard' as never); // Will navigate or reset state
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <LockKeyhole size={48} color="#2563eb" />
        <Text style={styles.title}>Update Password</Text>
        <Text style={styles.subtitle}>Please enter your new password</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="New Password"
          autoCapitalize={'none'}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
          placeholder="Confirm New Password"
          autoCapitalize={'none'}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={updatePassword} 
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update Password</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
