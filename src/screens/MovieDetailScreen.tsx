import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface MovieDetailScreenProps {}

const MovieDetailScreen = (props: MovieDetailScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>MovieDetailScreen</Text>
    </View>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {}
});