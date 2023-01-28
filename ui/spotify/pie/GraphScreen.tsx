"use client";

import { useState, useEffect, useMemo } from "react";
import PiChart from "./PieChart";
import { IProfile, ITopSpotifyArtist } from "../../../types/database";
export default function GraphScreen({ user }: { user: IProfile }) {
  const [artistToGenres, setArtistToGenres] = useState<IArtistToGenre[]>([]);

  const artists = useMemo(
    () => user.spotify_data?.items ?? [],
    [user.spotify_data?.items]
  );

  const [piData, setPiData] = useState<IChartData | undefined>();

  const indexOfMax = (arr: any[]): number => {
    if (arr.length === 0) return -1;
    return arr.reduce(
      (maxIndex, currentValue, currentIndex, array) =>
        currentValue > array[maxIndex] ? currentIndex : maxIndex,
      0
    );
  };

  useEffect(() => {
    function setTopArtistsForPieChart(): void {
      const artistsAndGenres = artists.map(({ name, genres }) => ({
        artistName: name,
        genresArr: genres,
      }));

      // @ts-ignore
      setArtistToGenres(artistsAndGenres);
    }

    function setGraphData(): void {
      const allGenres = artists.map(({ genres }) => genres).flat();
      const genreFrequencyMap: Record<string, number> = {};
      allGenres.forEach((genre) =>
        genreFrequencyMap.hasOwnProperty(genre)
          ? (genreFrequencyMap[genre] += 1)
          : (genreFrequencyMap[genre] = 1)
      );

      const [keys, vals] = [
        Object.keys(genreFrequencyMap),
        Object.values(genreFrequencyMap),
      ];

      let a = 0;

      const finalArr = [];

      while (a != 20 && keys.length != 0) {
        let currIndex = indexOfMax(vals);
        finalArr.push(keys[currIndex]);
        keys.splice(currIndex, 1);
        vals.splice(currIndex, 1);
        a++;
      }

      const finalObj: Record<string, any> = {};
      finalArr.map((genre) => {
        finalObj[genre] = genreFrequencyMap[genre];
      });

      const sum = Object.values(finalObj).reduce(
        (partialSum, a) => partialSum + a,
        0
      );

      const currPiData = {
        labels: Object.keys(finalObj),
        datasets: [
          {
            label: "Your Top Genres",
            //return num + "%"
            data: Object.values(finalObj).map(
              (value) => Math.round((value / sum) * 100) / 100
            ),
            backgroundColor: [
              "#e6194b",
              "#3cb44b",
              "#ffe119",
              "#4363d8",
              "#f58231",
              "#911eb4",
              "#46f0f0",
              "#f032e6",
              "#bcf60c",
              "#fabebe",
              "#008080",
              "#e6beff",
              "#9a6324",
              "#fffac8",
              "#800000",
              "#aaffc3",
              "#808000",
              "#ffd8b1",
              "#000075",
              "#808080",
            ],
            borderColor: "white",
            radius: "100%",
          },
        ],
      };
      setPiData(currPiData);
    }

    setTopArtistsForPieChart();
    setGraphData();
  }, [artists]);

  return piData && artistToGenres ? (
    <PiChart
      chartData={piData}
      artistToGenres={artistToGenres}
      artistName={user?.full_name}
    />
  ) : null;
}

export interface IArtistToGenre {
  artistName: string;
  genresArr: string[];
}

export interface IChartData {
  datasets: {
    backgroundColor: string[];
    borderColor: string;
    data: number[];
    label: string;
    radius: string;
  }[];
  labels: string[];
}
