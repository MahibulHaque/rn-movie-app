import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../api/apicalls';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import MovieCard from '../components/MovieCard';
import SubMovieCard from '../components/SubMovieCard';
import {useQuery} from '@tanstack/react-query';

interface HomeScreenProps {}

const {width, height} = Dimensions.get('window');

const fetchNowPlayingMoviesList = async () => {
  let response = await fetch(nowPlayingMovies);
  let json = await response.json();
  return json;
};

const fetchUpcomingMoviesList = async () => {
  let response = await fetch(upcomingMovies);
  let json = await response.json();
  return json;
};

const fetchPopularMoviesList = async () => {
  let response = await fetch(popularMovies);
  let json = await response.json();
  return json;
};

const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMoviesList,
  });
};

const usePopularMovies = () => {
  return useQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMoviesList,
  });
};

const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: fetchUpcomingMoviesList,
  });
};

const HomeScreen = ({navigation}: any) => {
  const {
    data: nowPlayingMoviesList,
    isLoading: isNowPlayingLoading,
    isError: isNowPlayingError,
  } = useNowPlayingMovies();
  const {
    data: popularMoviesList,
    isLoading: isPopularLoading,
    isError: isPopularMoviesError,
  } = usePopularMovies();
  const {
    data: upcomingMoviesList,
    isLoading: isUpcomingLoading,
    isError: isUpcomingMoviesError,
  } = useUpcomingMovies();

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  if (
    isNowPlayingLoading ||
    isPopularLoading ||
    isUpcomingLoading ||
    isNowPlayingError ||
    isPopularMoviesError ||
    isUpcomingMoviesError
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />

      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      <CategoryHeader title={'Now Playing'} />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <MovieCard
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w780', item.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />
      <CategoryHeader title={'Popular'} />
      <FlatList
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAround={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      <CategoryHeader title={'Upcoming'} />
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAround={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});
