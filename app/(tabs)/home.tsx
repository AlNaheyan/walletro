import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HelloWave } from '@/components/HelloWave'
import { supabase } from '@/lib/supabase'
import CustomButton from '@/components/CustomButton2'
import BottomSheetModal from '@/components/BSModal'

const Home = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [isModalVIsible, setIsModalVIsible] = useState(false);

  const toggleModal = () => {
    setIsModalVIsible(!isModalVIsible);
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const {data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session) {
          const userId = sessionData.session.user.id;

          const { data, error}= await supabase
          .from('users')
          .select('username')
          .eq('id', userId)
          .single();

          if (error) throw error;
          setUsername(data?.username || 'User');
        } else {
          console.log("no user session found")
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  },[]);

  if (loading) {
    return (
      <SafeAreaView>
        <Text> Loading...</Text>
      </SafeAreaView>
    )
  }
  
  return (
    <SafeAreaView className='bg-zinc-900 w-full h-full'>

      {/* Welcome Note with User's name */}
      <View className='bg-zinc-900 flex flex-col m-6'>
        <Text className='text-zinc-200 text-lg font-semibold opacity-60'>Welcome Back</Text>
        <View className='flex flex-row'>
          <Text className='text-zinc-200 text-3xl font-bold'>{username}!</Text>
          <HelloWave />
        </View>
      </View>


      {/* Add Transaction Button */}
      <CustomButton 
        title='Add Transaction'
        handlePress={toggleModal}
        containerStyles='bg-blue-600 mt-8 w-3/4 flex justify-center items-center'
        textStyles='text-white'
      />

      <BottomSheetModal
        isVisible = {isModalVIsible}
        toggleModal={toggleModal}
      />
    </SafeAreaView>
  )
}

export default Home