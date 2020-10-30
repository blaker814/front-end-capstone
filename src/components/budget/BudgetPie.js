import React, { useEffect, useRef } from 'react';
import Chartjs from 'chart.js';

const chartConfig = (total, spent ) => ({
    type: 'pie',
    
    data: {
        labels: ["Total spent", "Total remaining"],
        datasets: [
            {
                data: [spent, total-spent],
                backgroundColor: [
                    "rgba(220, 99, 52, 0.7)",
                    "rgba(76, 174, 151, 0.7)"
                    
                ],
                borderColor: [
                    "rgba(220, 99, 52, 1)",
                    "rgba(76, 174, 151, 1)"
                     
                ],
                borderWidth: 1
            }
        ] 
    },
    options: {
        title: {
            display: true,
            text: "Budget",
            fontSize: 16
        }
    }
})


export const BudgetPie = ({ total, spent }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
        new Chartjs(chartContainer.current, chartConfig(total, spent));
    }
  }, [chartContainer]);

  return (
    <div style={{width: "45%"}}>
      <canvas ref={chartContainer} />
    </div>
  );
};