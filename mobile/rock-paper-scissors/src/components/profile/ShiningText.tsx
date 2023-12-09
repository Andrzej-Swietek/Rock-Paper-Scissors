import React from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { FONT_SIZE_32, LIGHT, WIN, flex } from 'shared/styles';


export const ShiningText: React.FC<{ text: string }> = ({ text }) => {
    const animatedValue = useSharedValue(0);

    const shineAnimation = () => {
        animatedValue.value = withRepeat(
            withTiming(1, { duration: 2000, easing: Easing.linear }),
            -1,
            true,
        );
    };

    shineAnimation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            color: `rgba(255, 255, 255, ${animatedValue.value})`,
        };
    });

    return (
        <LinearGradient
            colors={['transparent', 'transparent']}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                flexDirection: 'row',
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <Animated.Text
                style={[
                    {
                        fontSize: FONT_SIZE_32,
                        fontWeight: 'bold',
                    },
                    animatedStyle,
                ]}
            >
                {text}
            </Animated.Text>
        </LinearGradient>
    );
};