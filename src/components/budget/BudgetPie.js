import React, { useEffect, useRef } from 'react';
import Chartjs from 'chart.js';

const chartConfig = (total, spent ) => ({
    type: 'pie',
    
    data: {
        labels: ["Total spent", "Remaining budget"],
        datasets: [
            {
                data: [spent, total-spent],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(75, 192, 192, 0.2)"
                    
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(75, 192, 192, 1)"
                     
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
    <div style={{width: "45%"}}>
      <canvas ref={chartContainer} />
    </div>
  );
};