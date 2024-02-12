import React, {useContext, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback, KeyboardAvoidingView, Image, Platform
} from "react-native";

// Components
import {SecondaryButton, StandardButton} from "components/common";
import {Center} from "components/common";

// Styles
import {FONT_SIZE_24, LIGHT, PRIMARY, SECONDARY} from "shared/styles";

// Navigation
import {AuthNavProps} from "navigation/stacks/AuthStack/AuthParamList";
import {UserService} from "shared/services";

interface RegisterProps extends AuthNavProps<'Register'>{
}

export const Register: React.FC<RegisterProps> = ({ navigation }) => {

    const [input, setInput] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitRegisterForm = async () => {
        try {
            const response = await UserService.createUser({ username: input, email, password });
            console.log(response)
            navigation.navigate('Login');
        } catch (e) {
            console.log("[REGISTER]: " + e);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}  behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.header}>
                <Text style={[styles.headerText, styles.accent]}> Register  </Text>
            </View>
            <View style={styles.body}>
                <TouchableWithoutFeedback >
                    <TextInput
                        style={styles.input}
                        onChangeText={ setInput }
                        value={ input }
                        placeholder="Username ..."
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback >
                    <TextInput
                        style={styles.input}
                        onChangeText={ setEmail }
                        value={ email }
                        placeholder="Email ..."
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback >
                    <TextInput
                        style={styles.input}
                        onChangeText={ setPassword }
                        value={ password }
                        placeholder="Password ..."
                        secureTextEntry={true}
                    />
                </TouchableWithoutFeedback>

                <StandardButton text={'Sign Up'} onPress={ ()=> submitRegisterForm() } />
                <SecondaryButton text={'Sign In'} onPress={ ()=> navigation.navigate('Login') } />
            </View>
            {/*<Image source={ require('../../assets/img/loginBlob.png') }  style={styles.image}/>*/}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT,
    },
    header: {
        flex: 1,
        margin: 10,
        marginTop: 10,
        borderRadius: 10,
        borderColor: SECONDARY,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    body: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
    },
    accent: {
        color: PRIMARY,
        fontWeight: "bold",
        fontFamily: 'Roboto-Bold'
    },
    headerText: {
        fontSize: 54,
        // lineHeight: 44,
        width: '80%',
        textAlign: 'left',
        color: SECONDARY,
        fontFamily: 'Roboto-Regular'
    },
    input: {
        height: 60,
        width: '80%',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 3,
        margin: 12,
        padding: 15,
        fontFamily: 'Roboto-Regular',
        fontSize: FONT_SIZE_24,
        borderColor: SECONDARY,
    },
    button: {
        width: '80%',
        backgroundColor: SECONDARY,
        textAlign: 'center'
    },
    image: {
        height: 270,
        width: 209,
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 2,
        // elevation: 2
    },

})

