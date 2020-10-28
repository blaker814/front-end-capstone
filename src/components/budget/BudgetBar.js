import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";

const chartConfig = (names, gifts) => {
    const labels = []
    const data = []
    names.forEach(name => {
        const giftsForName = gifts.map(gift => gift.giftList.giftsFor === name ? gift.price : 0)
        const amountSpent = giftsForName.reduce((a, b) => a + b)
        labels.push(name)
        data.push(amountSpent)
    })
    return ({
        type: "bar",
        data: {
            labels: labels,
            datasets: [
            {
                label: "Dollars spent",
                data: data,
                backgroundColor: [
                "rgba(255, 206, 86, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)"
                ],
                borderColor: [
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)"
                ],
                borderWidth: 1
            }
            ]
        },
        options: {
            scales: {
            yAxes: [
                {
                ticks: {
                    beginAtZero: true
                }
                }
            ]
            }
        }
    })
};

export const BudgetBar = ({ names, gifts }) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            new Chartjs(chartContainer.current, chartConfig(names, gifts));
        }
    }, [chartContainer]);

    return (
        <div style={{width: "40%"}}>
            <canvas ref={chartContainer} />
        </div>
    );
};
