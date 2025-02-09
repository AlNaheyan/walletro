import { View, Text, Image, ScrollView, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '../../assets/icon.png'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton2'
import { Link, router } from 'expo-router'
import { supabase } from '../../lib/supabase'

interface FormState {
  email: string;
  password: string;
  username: string;
}

const SignUp = () => {
  const [form, setForm] = useState<FormState>({
    username: '',
    email: '',
    password: '',
  })

  const handleChangeText = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
  }

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    const { email, password, username} = form;
    setisSubmitting(true);

    try {
      const { data: { session }, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: { 
            username: username.trim() // can add more options such as pphone number, expenses, saving
          },
        },
      });

      if (error) {
        Alert.alert('Signup', error.message);
      } else if (!session) {
        Alert.alert('Please Check inbox for email');
      } else {
        Alert.alert('Success', 'Account created! Please check your email to confirm your account.');
        router.replace('/(tabs)/home')
      }

    } catch (error:any) {
      Alert.alert('Error', error.message);
    } finally {
      setisSubmitting(false)
    }
  }



  return (
    <SafeAreaView className='bg-zinc-900 h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6 mt-16'>
          <View className='flex justify-center items-center'>
            <Image 
            source={Icon}
            resizeMode='contain'
            className='w-[250px] h-[60px]'
            />
            <Text className='text-zinc-200 font-medium text-lg'>
              Create your Walletra account!
            </Text>
          </View>

          <FormField 
          title= "Username"
          placeholder='John Doe'
          value= {form.username}
          handleChangeText = {(text:string) => handleChangeText('username', text)}
          otherStyle = "mt-10"
          keyboardType = "email-address"
          />

          <FormField 
          title= "Email"
          placeholder='John@Yahoo.com'
          value= {form.email}
          handleChangeText = {(text:string) => handleChangeText('email', text)}
          otherStyle = "mt-7"
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
            title='Sign Up'
            handlePress={submit}
            containerStyles='bg-blue-600 mt-8 w-full h-12 flex justify-center items-center'
            textStyles='text-zinc-200'
            isLoading={isSubmitting}
           />

           <View className='justify-center gap-2 pt-4 flex-row'>
            <Text className='text-zinc-400 text-base'>
              Have an account already?
            </Text>
            <Link href='/(auth)/sign-in' className='text-blue-600 font-bold text-base'>
              Sign In
            </Link>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp