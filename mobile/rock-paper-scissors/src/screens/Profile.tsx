import React, {useContext} from 'react';
import {Image, ImageBackground, SafeAreaView, StyleSheet, Text, View} from "react-native";

// Components
import {Center, FramedContainer, Row} from "components/common";
import {UserNavProps} from "navigation/stacks/UserStack/UserParamList";
import {flex, FONT_SIZE_32, LIGHT, PRIMARY, WIN, WINDOW_HEIGHT, WINDOW_WIDTH} from "shared/styles";
import {StatsHeader} from "components/common/StatsHeader";
import {HeaderImageBackdrop} from "components/common/HeaderImageBackdrop";
import {AuthContext} from "shared/providers";
import {ShiningText} from "components/profile";

interface SettingsProps extends UserNavProps<'profile'> {
}

const BACKDROP_HEIGHT = WINDOW_HEIGHT*0.65;
const SPACING: number = 10;

export const Profile: React.FC<SettingsProps> = ({ route, navigation }) => {

    // const { isPending, isError, data, error } = useQuery({
    //     queryKey: ["user"],
    //     queryFn: getUser,
    //     refetchInterval: 1000,
    // });

    const { user, logout } = useContext(AuthContext);


    return (
        <View style={styles.container}>
            <StatsHeader />
            <HeaderImageBackdrop
                imageSource={{ uri: 'https://images.pling.com/img/00/00/62/69/92/1727023/epic-071.jpg' }}
            />
            <View style={styles.cardWrapper}>

                <ImageBackground
                    source={require('../../assets/img/award-gold.png')}
                    resizeMode={'cover'}
                    style={{ height: '50%', aspectRatio: 1, backgroundColor: WIN, borderRadius: 26, ...flex('column', 'nowrap', 'center', 'center') }}
                    imageStyle={{
                        resizeMode: "cover",
                        alignSelf: "flex-end"
                    }}
                >
                    <View style={{  backgroundColor: '#0000003d', borderRadius: 10, paddingHorizontal: 10}}>

                      <Text style={{ fontSize: FONT_SIZE_32, fontWeight: "bold", }}> Gold V </Text>
                    </View>
                </ImageBackground>

                <FramedContainer style={{ width: '100%', height: '45%', ...flex('column', 'nowrap', 'center', 'flex-start') }}>
                    <View style={{ marginHorizontal: 10 }}>
                        <Text> Games Played: { user.gamesPlayed } </Text>
                        <Text> PvP: { user.gamesPlayed } </Text>
                        <Text> 2vs2: { user.gamesPlayed } </Text>
                        <Text> Win Ratio: x % </Text>
                    </View>
                </FramedContainer>



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
    },
    cardWrapper: {
        marginVertical: 30,
        paddingVertical: 10,
        width: 0.90* WINDOW_WIDTH,
        aspectRatio: 1,
        zIndex: 10,
        backgroundColor: LIGHT,
        marginHorizontal: SPACING,
        padding: SPACING * 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
        borderRadius: 34,
    }
});