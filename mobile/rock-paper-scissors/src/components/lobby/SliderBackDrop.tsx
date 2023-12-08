import {FC} from "react";
import {Animated, FlatList, Image, Platform, View} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

// Styles
import {WINDOW_HEIGHT, WINDOW_WIDTH} from "shared/styles";

// Types
import {GameModeSliderItem} from "shared/types";


interface SliderBackDropProps {
    scrollX : Animated.Value;
    modes: GameModeSliderItem[];
}

const BACKDROP_HEIGHT = WINDOW_HEIGHT*0.65;
const ITEM_SIZE: number = Platform.OS == 'ios' ? WINDOW_WIDTH*0.82 : WINDOW_WIDTH * 0.85;

export const SliderBackDrop: FC<SliderBackDropProps> = ({ scrollX, modes }) => {
    return (
        <View style={{ height: BACKDROP_HEIGHT, position: 'absolute' }}>
            <FlatList
                data={modes.reverse()}
                keyExtractor={(item) => item.id + '-backdrop'}
                removeClippedSubviews={false}
                contentContainerStyle={{width:  WINDOW_WIDTH, height: BACKDROP_HEIGHT }}
                renderItem={({ item, index }) => {
                    if (item.type == 'spacer')
                        return null;


                    const translateX = scrollX.interpolate({
                        inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
                        outputRange: [0, WINDOW_WIDTH],
                        // extrapolate:'clamp'
                    });
                    return (
                        <Animated.View
                            removeClippedSubviews={false}
                            style={{
                                position: 'absolute',
                                width: translateX,
                                height: WINDOW_HEIGHT,
                                overflow: 'hidden',
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: WINDOW_WIDTH,
                                    height: BACKDROP_HEIGHT,
                                    position: 'absolute',
                                }}
                            />
                        </Animated.View>
                    );
                }}
            />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'white']}
                style={{
                    height: BACKDROP_HEIGHT,
                    width: WINDOW_WIDTH,
                    position: 'absolute',
                    bottom: 0,
                }}
            />
        </View>
    )
}