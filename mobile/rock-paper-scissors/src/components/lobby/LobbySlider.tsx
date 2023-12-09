import {FC, useRef} from "react";
import {
    Image,
    StyleSheet,
    View, Text,
    Platform, Animated
} from "react-native";


// Styles
import {
    FONT_SIZE_12, FONT_SIZE_24,
    WINDOW_HEIGHT, WINDOW_WIDTH
} from "shared/styles";

// Types
import { GameModeSliderItem } from "shared/types";
import { SliderBackDrop } from "./SliderBackDrop";
import {StandardButton} from "components/common";
import {BattleButton} from "components/common/BattleButton";


interface LobbySliderProps {
    modes: GameModeSliderItem[];
}

const ITEM_SIZE: number = Platform.OS == 'ios' ? WINDOW_WIDTH*0.82 : WINDOW_WIDTH * 0.85;
const BACKDROP_HEIGHT: number = WINDOW_HEIGHT * 0.65;
const SPACING: number = 10;
const EMPTY_ITEM_SIZE: number = (WINDOW_WIDTH - ITEM_SIZE) / 2;

export const LobbySlider: FC<LobbySliderProps> = ({ modes }) => {

    const scrollX: Animated.Value = useRef(new Animated.Value(0)).current;
    return (
        <>
            <SliderBackDrop
                modes={modes}
                scrollX={scrollX}
            />
            <Animated.FlatList
                keyExtractor={(item) => item.id}
                data={modes}

                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                snapToInterval={ITEM_SIZE}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                bounces={false}

                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}

                renderItem={ ({ item, index }) => {
                    if (item.type == 'spacer') {
                        return <View style={{ width: EMPTY_ITEM_SIZE }} />
                    }

                    const inputRange: number[] = [
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                    ];

                    // Y Translation for active element
                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, -50, 0],
                        extrapolate: 'clamp',
                    });


                    return (
                        <View style={{ width:  ITEM_SIZE, marginTop: 80}}>
                            <Animated.View
                                style={{
                                    marginHorizontal: SPACING,
                                    padding: SPACING * 2,
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: 34,
                                    transform: [{ translateY }],
                                }}
                            >
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <Text
                                    style={{ marginVertical: 10 ,fontSize: FONT_SIZE_24 }}
                                    numberOfLines={1}
                                >
                                    { item.name }
                                </Text>
                                <Text
                                    style={{ fontSize: FONT_SIZE_12, marginBottom: SPACING }}
                                    numberOfLines={3}
                                >
                                    { item.description }
                                </Text>

                                {/*<StandardButton onPress={()=> item.goTo()} text={'play'} />*/}
                                <BattleButton onPress={()=> item.goTo()} text={'Battle'} />
                                { item.cardContent ? item.cardContent : null }

                            </Animated.View>
                        </View>
                    )
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: ITEM_SIZE*1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10
    }
})