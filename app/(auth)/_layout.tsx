import { Stack } from 'expo-router'
import '../../global.css';

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name='sign-in'
          options = {{
            headerShown: false
          }}
        />
        <Stack.Screen 
            name='sign-up'
            options = {{
              headerShown: false
            }}
          />
      </Stack>
    </>
  )
}

export default AuthLayout