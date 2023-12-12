import {Modal, StyleSheet, View, Text, TouchableOpacity, Animated} from "react-native";
import {FC, ReactNode, useEffect, useRef} from "react";
import {
    boxShadow,
    FONT_SIZE_16,
    FONT_SIZE_32,
    LIGHT,
    WINDOW_HEIGHT,
} from "shared/styles";
import {HeaderImageBackdrop} from "components/common";
import {AntDesign} from "@expo/vector-icons";

interface GameModeModalProps {
    open: boolean;
    close: ()=> void |  (() => Promise<void>);
    mode: 'PvP'|'PvE'|'2 vs 2'|'none',
    children?: ReactNode;
}

const transparent: string = 'rgba(0,0,0,.5)';


export const GameModeModal: FC<GameModeModalProps> = ({ open, children, close, mode }) => {

    const scaleValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (open) {
            Animated.spring(scaleValue, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        } else {
            setTimeout(()=> {
                Animated.spring(scaleValue, {
                    toValue: 0,
                    useNativeDriver: true
                }).start()
            }, 200)
        }
    }, [open]);

    const image = mode == 'PvE' ? ({ uri: 'https://images.pling.com/img/00/00/62/69/92/1727023/epic-071.jpg' })
        : mode == 'PvP'? ({uri: 'https://images.pling.com/img/00/00/62/69/92/1727023/epic-071.jpg'})
            : ({ uri: 'https://images.pling.com/img/00/00/62/69/92/1727029/epic-091.jpg' })

    return (
        <Modal visible={open} animationType={'slide'} transparent={true}>
            <View
                style={styles.modalWrapper}
            >
                <Animated.View
                    style={{
                        backgroundColor: LIGHT,
                        padding: 15,
                        width: '90%',
                        borderRadius: 20,
                        aspectRatio: 4/5,
                        overflow: 'hidden',
                        transform: [{scale: scaleValue} ]
                    }}
                >
                    <HeaderImageBackdrop
                        imageSource={image}
                    />
                    <View style={{ position: 'absolute', top: 20, right: 20 }}>
                        <TouchableOpacity onPress={()=> close()}>
                            <AntDesign name="close" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.modalTitle}> Join or Create the room </Text>
                    <Text style={styles.modalDescription}> If you create room the random room id will be generated. </Text>
                    { children }

                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: transparent
    },
    modalContent: {
        width: '80%',
        backgroundColor: LIGHT,
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    modalTitle: {
        zIndex: 300,
        fontSize: FONT_SIZE_32,
        fontWeight: "bold",
        color: LIGHT,

        marginTop: WINDOW_HEIGHT*0.05,
        marginBottom: 20,
        paddingHorizontal: 20,

        ...boxShadow('#000')
    },
    modalDescription: {
        paddingHorizontal: 20,
        marginBottom: 40,
        color: LIGHT,
        fontWeight: "400",
        fontSize: FONT_SIZE_16,
    }
});