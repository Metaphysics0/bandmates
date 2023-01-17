"use client";

import { useState, useEffect } from "react";
import PiChart from "./PieChart";
import { ITopSpotifyArtist } from "../../../types/database";
export default function GraphScreen({
  artists,
}: {
  artists: ITopSpotifyArtist[];
}) {
  const [artistToGenres, setArtistToGenres] = useState<IArtistToGenre[]>([]);

  const [piData, setPiData] = useState<IChartData | undefined>();

  const indexOfMax = (arr: any[]) => {
    if (arr.length === 0) return -1;
    let max = arr[0];
    let maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
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

  return (
    <div>
      {piData && artistToGenres ? (
        <PiChart chartData={piData} artistToGenres={artistToGenres} />
      ) : null}
    </div>
  );
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
