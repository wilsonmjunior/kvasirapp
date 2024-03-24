import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { styles } from './styles';

interface Props {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 100);

  const sharedProgress = useSharedValue(percentage);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${percentage}%`,
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(percentage);
  }, [current, percentage])

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, animatedStyle]} />
    </View>
  );
}