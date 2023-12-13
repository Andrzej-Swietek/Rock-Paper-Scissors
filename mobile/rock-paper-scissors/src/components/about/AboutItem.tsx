import React, {FC, useEffect, useRef, useState} from "react";
import {Animated, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {
    DIAMOND,
    FONT_SIZE_14,
    FONT_SIZE_16,
    FONT_SIZE_24,
    PRIMARY, SECONDARY,
    WHITE,
    WINDOW_HEIGHT,
    WINDOW_WIDTH
} from "shared/styles";
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import {Row} from "components/common";

interface IAboutItem {
    id?:number,
    header?:string,
    description?: string,
    icon?:string
    // children: React.ReactNode;
}

export const AboutItem: FC<{item: IAboutItem}> = ({ item }) => {
    let [toggled, setToggled] = useState(false);
    const height = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        Animated.timing(height, {
            toValue: toggled ? 1 : 0,
            duration: 400,
            useNativeDriver: false,
        }).start();
    }, [toggled]);

    const saveButtonHeight = height.interpolate({
        inputRange: [0, 1],
        outputRange: [WINDOW_HEIGHT/4, WINDOW_HEIGHT* (3/7)],
    });

    return (
        <Animated.View style={[styles.aboutItemContainer,{height: saveButtonHeight}]}>
        <TouchableWithoutFeedback onPress={() => {setToggled((prev) => !prev)}} style={{flex:1}}>
            <View>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>{item?.header}</Text>
                <AntDesign name={toggled?"up":"down"} size={20} color={WHITE} />
            </View>
            <View style={styles.descriptionTextContainer}>
                <Text style={styles.descriptionText}>{item?.description}</Text>
            </View>
            <Row>
                <FontAwesome5 style={{marginVertical: 30, marginHorizontal: 10}} name={item.icon} size={48} color={WHITE} />
                {/*<FontAwesome5 style={{marginVertical: 30, marginHorizontal: 10}} name="python" size={48} color={SECONDARY}  />*/}
                {/*<FontAwesome5 style={{marginVertical: 30, marginHorizontal: 10}} name="react" size={48} color={SECONDARY} />*/}
            </Row>
            </View>
    </TouchableWithoutFeedback>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    aboutItemContainer: {
        marginVertical:10,
        flexDirection: "column",
        backgroundColor: SECONDARY+'8d',
        // maxHeight: WINDOW_HEIGHT/3,
        // maxHeight:
        // transform: [{ scaleY: scaling }],
        width: WINDOW_WIDTH * 0.86,
        borderRadius: 15,
        overflow: "hidden"
    },
    headerTextContainer: {
        padding:30,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
        // paddingTop: 30
    },
    headerText: {
        color: WHITE,
        fontSize: FONT_SIZE_24,
        // fontWeight: "bold"
        fontFamily: 'Roboto-Bold',
    },
    descriptionTextContainer: {
        padding:30,
        paddingVertical:0
    },
    descriptionText: {
        color: WHITE,
        fontSize: FONT_SIZE_14,
        fontFamily: 'Roboto',
    }
})