import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { styled } from "nativewind";
import { View as RNView } from "react-native";
import { Button, Slider } from "react-native-ui-lib";

const View = styled(RNView);

type SliderValues = {
  speed: number;
  spin: number;
  direction: number;
  height: number;
  frequency: number;
  randomness: number;
};

const SingleShot: React.FC = () => {
  const [sliderValues, setSliderValues] = useState<SliderValues>({
    speed: 5,
    spin: 5,
    direction: 5,
    height: 5,
    frequency: 5,
    randomness: 5,
  });

  const handleSliderChange = (name: keyof SliderValues, value: number) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <View className="flex-1 mt-16 justify-center bg-red-300 p-4">
      <Text style={styles.title}>Customize Table Tennis Bot</Text>

      {Object.keys(sliderValues).map((key) => (
        <View key={key} className="mb-6">
          <Text style={styles.label}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <Slider
            step={1}
            value={sliderValues[key as keyof SliderValues]}
            minimumValue={0}
            maximumValue={10}
            onValueChange={(value) => handleSliderChange(key as keyof SliderValues, value)}
          />
          <Text style={styles.value}>
            Value: {sliderValues[key as keyof SliderValues]}
          </Text>
        </View>
      ))}
      
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default SingleShot;
