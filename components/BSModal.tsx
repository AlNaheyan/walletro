import { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomSheetModal = ({ isVisible, toggleModal }: any) => {
    const [amount, setAmount] = useState<number>(0);
    const [catagory, setCatagory] = useState<string>('');
    const [type, setType] = useState<'income' | 'expense'>('expense'); // should only be expense or income

    const expenseCatagory = ['Grocery', 'Food', 'Cloth', 'Travel', 'Rent', 'Other'];
    const incomeCatagory = ['Pay Check', 'Stipend', 'Zelle', 'Dividend', 'Friends', 'Other'];

    const { bottom } = useSafeAreaInsets();


    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(300)).current;


    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 300,
                    duration: 300,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible]);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 300,
                duration: 300,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => toggleModal());
    };

    const handleSave = () => {

        if (amount <= 0) {
            alert('Please enter a valid amount greater than 0.');
            return;
        }

        console.log('Transaction Saved!', { type, catagory, amount });
        handleClose(); 
    };

    return (
        <Modal
            visible={isVisible}
            animationType="none"
            transparent={true}
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior="padding" className="flex-1 justify-end">
                <Animated.View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        opacity,
                    }}
                >
                    <Animated.View
                        style={{
                            transform: [{ translateY }],
                            backgroundColor: 'white',
                            padding: 20,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingBottom: bottom || 20,
                        }}
                    >
                        {/* Header */}
                        <View className="flex-row justify-between items-center mb-10">
                            <Text className="text-2xl font-bold">Add Your Transaction</Text>
                            <TouchableOpacity onPress={handleClose}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        {/* Transaction Type */}
                        <View>
                            <Text className="text-lg font-semibold text-gray-600 mb-4">
                                Which type of transaction is this?
                            </Text>
                        </View>

                        <View className="flex-row ">
                            <TouchableOpacity
                                onPress={() => setType('expense')}
                                className={`px-4 py-2 rounded-full mr-4 ${
                                    type === 'expense'
                                        ? 'border-2 border-gray-100/5 bg-blue-500 text-gray-200'
                                        : ' border-2 border-gray-200'
                                }`}
                            >
                                <Text className="text-center">Expense</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setType('income')}
                                className={`px-4 py-2 rounded-full ${
                                    type === 'income'
                                        ? 'border-2 border-gray-100/5 bg-blue-500 text-zinc-900'
                                        : 'border-2 border-gray-200'
                                }`}
                            >
                                <Text className="text-center ">Income</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Category Selection */}
                        <View>
                            <Text className="text-lg font-semibold text-gray-600 mb-2 mt-10">
                                What category does this transaction go to?
                            </Text>
                        </View>

                        <View className="flex-row flex-wrap">
                            {(type === 'expense' ? expenseCatagory : incomeCatagory).map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    onPress={() => setCatagory(cat)}
                                    className={`px-4 py-2 rounded-full m-2 border ${
                                        catagory === cat
                                            ? 'border-2 border-gray-100/5 bg-blue-500 text-zinc-900'
                                            : 'border-2 border-gray-200'
                                    }`}
                                >
                                    <Text className="text-center">{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Amount Input */}
                        <TextInput
                            value={amount.toString()}
                            onChangeText={(text) => setAmount(text == '' ? 0: parseInt(text))}
                            placeholder="Amount"
                            keyboardType="numeric"
                            className="mt-4 border-b-2 border-gray-400 text-xl py-2"
                        />

                        {/* Save Button */}
                        <TouchableOpacity
                            onPress={handleSave}
                            className="mt-6 bg-blue-600 p-3 rounded-lg"
                        >
                            <Text className="text-white text-center text-lg">Save</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default BottomSheetModal;
