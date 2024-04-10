import { Text, Dimensions, View } from 'react-native';

import { Option } from '../Option';
import { styles } from './styles';
import Animated, { Keyframe } from 'react-native-reanimated';
import React from 'react';

type QuestionProps = {
  title: string;
  alternatives: string[];
}

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
}

const WINDOW_WIDTH = Dimensions.get('window').width;

export function Question({ question, alternativeSelected, setAlternativeSelected }: Props) {
  const enteringKeyFrame = new Keyframe({
    0: {
      opacity: 0,
      transform: [
        { translateX: WINDOW_WIDTH }, 
        // { rotate: '90deg' }
      ],
    },
    70: {
      opacity: 0.3,
    },
    100: {
      opacity: 1, 
      transform: [
        { translateX: 0 }, 
        // { rotate: '0deg' }
      ],
    },
  })

  return (
    <View
      // entering={enteringKeyFrame} 
      style={styles.container}
    >
      <Text style={styles.title}>
        {question.title}
      </Text>

      {
        question.alternatives.map((alternative, index) => (
          <Option
            key={index}
            title={alternative}
            checked={alternativeSelected === index}
            onPress={() => setAlternativeSelected && setAlternativeSelected(index)}
          />
        ))
      }
    </View>
  );
}