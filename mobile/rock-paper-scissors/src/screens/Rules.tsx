import React from 'react';
import {Animated, FlatList, Image, StyleSheet, Text, View} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

// Components
import {Center, HeaderImageBackdrop, Row} from "components/common";
import { InfoNavProps } from 'navigation/stacks/InfoStack/InfoParamList';
import {
    LIGHT,
    PRIMARY,
    SECONDARY,
    WINDOW_HEIGHT,
    WINDOW_WIDTH
} from "shared/styles";
import {StatsHeader} from "components/common/StatsHeader";
import {AboutItem} from "components/about/AboutItem";
import {MOCK_IMAGES} from "shared/constants";

interface RulesProps extends InfoNavProps<'rules'> {
}
const aboutItems=[
    {id:0,header:"Project description",icon:"node",description:"This app is a modern implementation of the popular game of rock, paper and scissors.\nWe use AI to classify player's gestures."},
    {id:1,header:"How to play",icon:"python",description:"It is quite simple: when prompted, show a chosen gesture to the camera. Then wait for the result of the current round."},
    {id:2,header:"About the authors",icon:"react",description:"We are CS students @UST in Kraków.\nWe are also very handsome and over all great people."}
]

export const Rules: React.FC<RulesProps> = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderImageBackdrop imageSource={{ uri: MOCK_IMAGES[2] }}/>
            <StatsHeader />

            <View style={{height:WINDOW_HEIGHT*0.78}}>
                <FlatList
                keyExtractor={(item) => item.id}
                data={aboutItems}
                showsVerticalScrollIndicator={false}

                contentContainerStyle={{
                    alignItems: 'center'
                }}
                renderItem={ ({ item, index }) => {
                    return (
                        <AboutItem key={index} item={item}/>
                    )
                }}
                ListFooterComponent={ <View style={{ height: WINDOW_HEIGHT/10 }} />}
                >
                    <View style={{ height: WINDOW_HEIGHT/5 }} />
                </FlatList>

                {/*<AboutItem item={{header:"Project description",description:"This is app is a modern implementation of the popular game of rock, paper and scissors.\nWe use AI to classify player's gestures."}}/>*/}
                {/*<AboutItem item={{header:"How to play",description:"It is quite simple: when prompted, show a chosen gesture to the camera. Then wait for the result of the current round."}}/>*/}
                {/*<AboutItem item={{header:"About the authors",description:"We are CS students @UST in Kraków.\nWe are also very handsome and over all great people."}}/>*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT,
        // backgroundColor:"#FFAAFF",
        paddingVertical: 30,
        alignItems: 'center'
    },
});