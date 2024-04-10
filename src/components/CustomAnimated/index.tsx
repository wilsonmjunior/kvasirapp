import { Pressable, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default {
  Pressable: AnimatedPressable,
  TouchableOpacity: AnimatedTouchableOpacity,
}
