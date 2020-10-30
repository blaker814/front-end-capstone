import React, { useEffect, useRef } from "react";
import Chartjs from "chart.js";

const chartConfig = (names, gifts) => {
    const labels = []
    const data = []
    const backgroundColor = []
    const borderColor = []
    names.forEach(name => {
        const giftsForName = gifts.map(gift => gift.giftList.giftsFor === name ? gift.price : 0)
        const amountSpent = giftsForName.reduce((a, b) => a + b)
        labels.push(name)
        data.push(amountSpent)
        backgroundColor.push("rgba(234, 162, 88, 0.7)")
        borderColor.push("rgba(234, 162, 88, 1)")
    })
    return ({
        type: "bar",
        data: {
            labels: labels,
            datasets: [
            {
                label: "Amount spent",
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }
            ]
        },
        options: {
            scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Dollars"
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }
            ],
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Recipient"
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
        <div style={{width: "45%", marginTop: "1em"}}>
            <canvas ref={chartContainer} />
        </div>
    );
};
