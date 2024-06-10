import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const SliderForm: React.FC = () => {
  const [sliderValues, setSliderValues] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const handleSliderChange = (index: number, value: number) => {
    const newValues = [...sliderValues];
    newValues[index] = value;
    setSliderValues(newValues);
  };

  const handleSubmit = () => {
    console.log('Submitted values:', sliderValues);
  };

  return (
    <View style={styles.container}>
      {sliderValues.map((value, index) => (
        <View key={index} style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Slider {index + 1}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={value}
            onValueChange={(val) => handleSliderChange(index, val)}
            minimumTrackTintColor="#1FB28A"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1FB28A"
          />
          <Text style={styles.sliderValue}>{value}</Text>
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
  },
  sliderValue: {
    textAlign: 'center',
    marginTop: 8,
  },
});

export default SliderForm;
