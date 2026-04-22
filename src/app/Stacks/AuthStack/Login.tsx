import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedIcon } from '@/components/animated-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import useUser from '@/hooks/useUser';

import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    
  const navigation = useNavigation<any>();
  const { login } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login failed', 'Please enter both email and password.');
      return;
    }

    const res = await login(email, password);
    console.log('Login response:', res);
    
    if(res.status === false){
        Alert.alert('Login failed', 'An error occurred during login.');
        return
    }

    Alert.alert('Logged in', `Welcome back, ${email}!`);
    navigation.replace('Main');

  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.header}>
            <AnimatedIcon />
            <ThemedText type="title" style={styles.title}>
              AKUA
            </ThemedText>
            <ThemedText type="default" style={styles.subtitle}>
              Sign in to continue to AKUA
            </ThemedText>
          </View>

          <View style={styles.form}>
            <ThemedText type="small">Email</ThemedText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#999"
            />

            <ThemedText type="small" style={styles.fieldLabel}>
              Password
            </ThemedText>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <ThemedText type="small" style={styles.buttonText}>
                Log in
              </ThemedText>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,

  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing.six,
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    marginBottom: Spacing.two,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: Spacing.three,
    textAlign: 'center',
  },
  form: {
    gap: Spacing.three,
  },
  fieldLabel: {
    marginTop: Spacing.four,
  },
  input: {
    height: 48,
    borderRadius: 14,
    paddingHorizontal: Spacing.three,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
  },
  button: {
    marginTop: Spacing.four,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563eb',
  },
  buttonText: {
    color: '#fff',
  },
});