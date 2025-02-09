import { View, Text, Image, ScrollView, Alert} from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '../../assets/icon.png'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton2'
import { Link, router, useRouter } from 'expo-router'
import { supabase } from '../../lib/supabase'

interface FormState {
  email: string;
  password: string;
}

const SignIn = () => {
  const [form, setForm] = useState<FormState>({
    email: '',
    password: ''
  })

  const handleChangeText = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
  }

  const [isSubmitting, setisSubmitting] = useState(false)


  const submit = async () => {
    const { email, password} = form;
    setisSubmitting(true);

    try {
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('error: ', error);
      if (error) {
        Alert.alert('Error: ', error.message);
      } else {
        Alert.alert('Success ', 'You are now signed In!');
        router.replace('/(tabs)/home');
      }
    } catch (error: any) {
      Alert.alert('Error: ', error.message);
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <SafeAreaView className=' bg-zinc-900 h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6 mt-16'>
          <View className='flex justify-center items-center'>
            <Image 
            source={Icon}
            resizeMode='contain'
            className='w-[250px] h-[60px]'
            />
            <Text className='text-zinc-200 font-medium text-lg'>
              Log into your Walletra account!
            </Text>
          </View>
          
          <FormField 
          title= "Email"
          placeholder='you@gmail.com'
          value= {form.email}
          handleChangeText = {(text:string) => handleChangeText('email', text)}
          otherStyle = "mt-10"
          keyboardType = "email-address"
          />
          <FormField 
          title= "Password"
          placeholder='Enter your password'
          value= {form.password}
          handleChangeText = {(text:string) => handleChangeText('password', text)}
          otherStyle = "mt-7"
          />
          <CustomButton 
            title='Sign In'
            handlePress={submit}
            containerStyles='bg-blue-600 mt-8 w-full h-12 flex justify-center items-center'
            textStyles='text-zinc-200'
            isLoading={isSubmitting}
           />

           <View className='justify-center gap-2 pt-4 flex-row'>
            <Text className='text-zinc-400 text-base'>
              Don't have an account?
            </Text>
            <Link href='/(auth)/sign-up' className='text-blue-600 font-bold text-base'>
              Sign up
            </Link>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn