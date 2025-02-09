import { View, Text, Alert } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton2'

const Profile = () => {

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Logout error', error.message);
    } else {
      router.replace('/(auth)/sign-in');
    }
  }

  return (
    <View className='flex-1 items-center justify-center bg-zinc-900'>
      <Text className='text-zinc-200 text-2xl mb-4'>Profile</Text>
      <CustomButton 
            title='Sign out'
            handlePress={handleLogout}
            containerStyles='bg-blue-600 mt-8 w-1/2 h-12 flex justify-center items-center'
            textStyles='text-zinc-200'
          />
    </View>
  )
}

export default Profile