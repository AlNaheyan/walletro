import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native'
import Logo from '../assets/icon.png';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton2 from '@/components/CustomButton2';
import CustomButton from '@/components/CustomButton';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import React from 'react'

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {data: {session}} = await supabase.auth.getSession();
      setLoading(false);
      if (session) {
        router.replace("/(tabs)/home");
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(false);
      if (session) {
        router.replace("/(tabs)/home");
      } else {
        console.log("No User");
      }
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView className='bg-zinc-900 h-full flex justify-center items-center'>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='bg-zinc-900 h-full'>
      <ScrollView contentContainerStyle = {{ height: '100%'}} >
        <View className='w-full justify-center items-center min-h-[94vh] px-4'>
          <Image source={Logo} resizeMode='contain' className='w-[280px] h-[60px]' />
          <Text className='text-zinc-200 text-2xl text-center mb-3 underline decoration-blue-600 decoration-8 font-medium'>
            Your wallet, your way 
          </Text>
          <Text className='text-zinc-200 text-md text-center w-3/4 font-small'>
            Whether it’s daily expenses, recurring bills, or unexpected income, Walletro helps you track every penny. 
          </Text>
          <CustomButton2 
            title = "Create an account"
            handlePress = {() => router.push('/(auth)/sign-up')}
            containerStyles = "bg-blue-600 mt-8 w-3/4 flex justify-center items-center h-12"
            textStyles='text-zinc-200 text-xl'
          />
          <CustomButton 
            title = "Log in"
            handlePress = {() => router.push('/(auth)/sign-in')}
            containerStyles = "mt-4 w-3/4 flex justify-center items-center h-12 border-blue-600 "
            textStyles='text-blue-600 text-xl'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index