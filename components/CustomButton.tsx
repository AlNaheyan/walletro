import { View, Text, TouchableOpacity } from 'react-native'

interface CustomButtonProp {
    title: string,
    handlePress: () => void,
    containerStyles: string,
    textStyles?: string,
    isLoading?: boolean
}

const CustomButton: React.FC<CustomButtonProp> = ( {title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`px-4 py-2 rounded-lg border-2 border-b-4 active:border-2 active:translate-y-0.5 ${containerStyles}`}
        >
        <Text className={`text-lg font-semibold ${textStyles} `}>{title} </Text>
    </TouchableOpacity>
  )
}

export default CustomButton