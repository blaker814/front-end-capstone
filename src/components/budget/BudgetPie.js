import React, { useEffect, useRef } from 'react';
import Chartjs from 'chart.js';

const chartConfig = (total, spent ) => ({
    type: 'pie',
    data: {
        labels: ["Remaining budget", "Total spent"],
        datasets: [
            {
                data: [total-spent, spent],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(255, 99, 132, 0.2)"
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)"  
                ],
                borderWidth: 1
            }
        ]
    }
})


export const BudgetPie = ({ total, spent }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
        new Chartjs(chartContainer.current, chartConfig(total, spent ));
    }
  }, [chartContainer]);

  return (
    <div style={{width: "40%"}}>
      <canvas ref={chartContainer} />
    </div>
  );
};