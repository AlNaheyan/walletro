import { View, Text, KeyboardTypeOptions, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import  icons  from '../constants/icons'

interface FormFieldProp {
    title: string,
    placeholder: string,
    value: string,
    handleChangeText: (text: string) => void,
    otherStyle?: string,
    keyboardType?: KeyboardTypeOptions
}

const FormField: React.FC<FormFieldProp> = ({ title, value, handleChangeText, placeholder, otherStyle = '', keyboardType = 'default'}) => {

  const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className='text-zinc-100 font-bold'> {title} </Text>
      <View className='border-2 rounded-xl border-zinc-800 w-full h-12 px-4 bg-zinc-900 focus:border-blue-600 items-center flex-row'>
        <TextInput className='flex-1 text-zinc-100 font-medium w-full'
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
        secureTextEntry = {title === 'Password' && !showPassword}
        />

        {title ==='Password' && (
          <TouchableOpacity onPress={() =>
            setshowPassword(!showPassword)}>
              <Image source= {!showPassword ? icons.EyeOpen : icons.EyeClosed} className='w-4 h-4 opacity-75' resizeMode='contain' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField