import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";

// Contexts
import { InfoNavProps } from 'navigation/stacks/InfoStack/InfoParamList';
// Constants
import {ABOUT_ITEMS, MOCK_IMAGES} from "shared/constants";
// Components
import { HeaderImageBackdrop } from "components/common";
import {StatsHeader} from "components/common/StatsHeader";
import {AboutItem} from "components/about/AboutItem";
// Styles
import {
    LIGHT,
    WINDOW_HEIGHT
} from "shared/styles";

interface RulesProps extends InfoNavProps<'about'> {
}

export const About: React.FC<RulesProps> = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderImageBackdrop imageSource={{ uri: MOCK_IMAGES[2] }}/>
            <StatsHeader />

            <View style={{height:WINDOW_HEIGHT*0.78}}>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={ABOUT_ITEMS}
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
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT,
        paddingVertical: 30,
        alignItems: 'center'
    }
});