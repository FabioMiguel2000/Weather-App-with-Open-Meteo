import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, ChartOptions } from "chart.js";

interface TemperatureChartProps {
  data: {
    time: string[];
    temperature_2m: number[];
  };
}

function formatDateForTooltip(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }) + ' ' + date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateForAxis(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  }).replace(" ", " "); 
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const { time, temperature_2m } = data;

  const labels = time.map((t, index) => {
    // Check if the day has changed compared to the previous time entry
    if (index === 0 || formatDateForAxis(time[index - 1]) !== formatDateForAxis(t)) {
      return formatDateForAxis(t); // Show the day if it's a new one
    }
    return ''; // Don't show the day if it's the same
  });

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff"
        }
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            return formatDateForTooltip(time[context[0].dataIndex]);
          },
          label: function(context) {
            return `Temperature: ${context.raw} °C`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "#ffffff"  
        },
        ticks: {
          color: "#ffffff"  
        },
        grid: {
          color: "#444444"  
        }
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
          color: "#ffffff"  
        },
        ticks: {
          color: "#ffffff" 
        },
        grid: {
          color: "#444444"  
        },
        beginAtZero: true,
      },
    },
  };

  const chartData: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: temperature_2m,
        borderColor: "rgb(10, 132, 255)",  
        backgroundColor: "rgba(10, 132, 255, 0.5)",  
        pointBackgroundColor: "#ffffff",  
        pointBorderColor: "rgb(10, 132, 255)"  
      },
    ],
  };

  return <Line data={chartData} options={options} className="w-full"/>;
};

export default TemperatureChart;
