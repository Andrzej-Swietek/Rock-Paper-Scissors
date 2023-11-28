import {FC} from "react";
import {FlatList, Image, StyleSheet, View, Text, Platform} from "react-native";
import {FONT_SIZE_12, FONT_SIZE_24, SCALE_12, WINDOW_HEIGHT, WINDOW_WIDTH} from "shared/styles";

interface LobbySliderProps {
    modes: { id: string, name: string, description: string,  screen: string, image: string }[]
}

const ITEM_SIZE: number = Platform.OS == 'ios' ? WINDOW_WIDTH*0.82 : WINDOW_WIDTH * 0.85;
const BACKDROP_HEIGHT: number = WINDOW_HEIGHT * 0.65;
const SPACING: number = 10;
const EMPTY_ITEM_SIZE: number = (WINDOW_WIDTH - ITEM_SIZE) / 2;

export const LobbySlider: FC<LobbySliderProps> = ({ modes }) => {
    return (
        <>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={modes}
                horizontal
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                snapToInterval={ITEM_SIZE}
                decelerationRate={0}
                bounces={false}
                keyExtractor={(item) => item.id}
                renderItem={ ({ item }) => (
                    <View style={{ width:  ITEM_SIZE}}>
                        <View
                            style={{
                                marginHorizontal: SPACING,
                                padding: SPACING * 2,
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 34
                            }}
                        >
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text
                                style={{ fontSize: FONT_SIZE_24 }}
                                numberOfLines={1}
                            >
                                { item.name }
                            </Text>
                            <Text
                                style={{ fontSize: FONT_SIZE_12 }}
                                numberOfLines={3}
                            >
                                { item.description }
                            </Text>
                        </View>
                    </View>
                )}
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