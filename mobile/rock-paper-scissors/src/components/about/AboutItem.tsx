import React, {FC, useEffect, useRef, useState} from "react";
import {Animated, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";

// Styles
import {
    FONT_SIZE_16,
    FONT_SIZE_24,
    SECONDARY,
    WHITE,
    WINDOW_HEIGHT,
    WINDOW_WIDTH
} from "shared/styles";
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import {Row} from "components/common";

interface IAboutItem {
    id?: number,
    header?: string,
    description?: string,
    icons?: string[]
}

export const AboutItem: FC<{item: IAboutItem}> = ({ item }) => {
    let [toggled, setToggled] = useState(false);
    let [descLines, setDescLines] = useState(0);

    const height = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(height, {
            toValue: toggled ? 1 : 0,
            duration: 180,
            useNativeDriver: false,
        }).start();
    }, [toggled]);

    const componentHeight = height.interpolate({
        inputRange: [0, 1],
        outputRange: [WINDOW_HEIGHT/5,  WINDOW_HEIGHT * (3/12) + WINDOW_HEIGHT * (descLines/27)],
    });

    return (
        <Animated.View style={[styles.aboutItemContainer, {height: componentHeight}]}>
        <TouchableWithoutFeedback onPress={() => {setToggled((prev) => !prev)}} style={{flex:1}}>
        <View>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>{item?.header}</Text>
                <AntDesign name={toggled?"up":"down"} size={20} color={WHITE} />
                {/*<FontAwesome5 name={toggled?"chevron-up":"chevron-down"} color={WHITE} />*/}
            </View>
            {
                toggled ? (
                    <View style={styles.descriptionTextContainer}>
                        <Text style={styles.descriptionText}
                            onTextLayout={(e)=>{setDescLines(e.nativeEvent.lines.length)}}
                        >
                            {item?.description}
                            {/*{ !toggled && ' ...' }*/}
                        </Text>
                    </View>
                ) : null
            }
            <View>
                <Row flex={{justifyContent: toggled ? "center" : "flex-end", alignItems: "center"}} customStyle={{marginRight: toggled? 0 : 20}}>
                    {
                        item.icons.map((icon, i) => {
                            return <FontAwesome5 key={i} style={{marginVertical: 30, marginHorizontal: 10}} name={icon} size={48} color={WHITE}/>
                        })
                    }
                </Row>
            </View>
        </View>
        </TouchableWithoutFeedback>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    aboutItemContainer: {
        marginVertical: 10,
        flexDirection: "column",
        backgroundColor: SECONDARY+'8d',
        width: WINDOW_WIDTH * 0.86,
        borderRadius: 15,
        overflow: "hidden"
    },
    headerTextContainer: {
        padding: 30,
        paddingBottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerText: {
        color: WHITE,
        fontSize: FONT_SIZE_24,
        fontFamily: 'Roboto-Bold'
    },
    descriptionTextContainer: {
        padding: 30,
        paddingBottom: 0,
    },
    descriptionText: {
        color: WHITE,
        fontSize: FONT_SIZE_16,
        fontFamily: 'Roboto'
    }
});