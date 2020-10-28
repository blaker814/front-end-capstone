import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

const chartConfig = (total, spent) => {
    return ({
        type: 'pie',
        data: {
            labels: ["Remaining budget", "Total spent"],
            datasets: [
                {
                    data: [total-spent, spent],
                    backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)"
                    ],
                    borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        }
    })
};

export const BudgetPie = ({ total, spent }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
        new Chartjs(chartContainer.current, chartConfig(total, spent));
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};