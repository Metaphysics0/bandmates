import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { IArtistToGenre, IChartData } from "./GraphScreen";

export default function PiChart({
  chartData,
  artistToGenres,
}: {
  chartData: IChartData;
  artistToGenres: IArtistToGenre[];
}) {
  return (
    <Pie
      className="pichart"
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Your Top Genres 🥧",
            color: "#000000",
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              color: "#000000",
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context: any): string {
                let initialLabel: string = context.label + ": ";

                const artists = artistToGenres
                  .map((artist) =>
                    artist.genresArr.includes(context.label)
                      ? artist.artistName
                      : null
                  )
                  .filter(Boolean);

                artists.forEach((artist) => {
                  initialLabel += artist + ", ";
                });

                return initialLabel.substring(0, initialLabel.length - 2);
              },
            },
          },
        },
      }}
    />
  );
}
