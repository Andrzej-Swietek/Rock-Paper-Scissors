import React, {useContext, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback, KeyboardAvoidingView, Image, Platform
} from "react-native";

// Components
import { StandardButton } from "components/common";

// Styles
import {LIGHT, PRIMARY, SECONDARY} from "shared/styles";
import {FONT_SIZE_24} from "shared/styles";
import {AuthContext} from "shared/providers";

interface LoginProps {
}

export const Login: React.FC<LoginProps> = ({}) => {
    const [input, setInput] = useState('');
    const { login } = useContext(AuthContext);

    const submitLoginForm = () => {
        login( input );
    }

    return (
        <KeyboardAvoidingView style={styles.container}  behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.header}>
                <Text style={styles.headerText}> Rock </Text>
                <Text style={[styles.headerText, styles.accent]}> Paper </Text>
                <Text style={styles.headerText}> Scissors </Text>
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
                <StandardButton text={'Sign In'} onPress={ ()=> submitLoginForm() } />
            </View>
            <Image source={ require('../../assets/img/loginBlob.png') }  style={styles.image}/>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT,
    },
    header: {
        flex: 4,
        margin: 10,
        borderRadius: 10,
        borderColor: SECONDARY,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    body: {
        flex: 4,
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
