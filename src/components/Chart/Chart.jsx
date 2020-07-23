import React,{useEffect , useState} from 'react'
import {fetchDailyData} from '../../api';
import { Line , Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

function Chart({data , country}) {
    const [dailyData , setDailyData] = useState([]);

    useEffect(()=>{
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    } , [])

    const lineChart = (
        dailyData.length
        ? <Line
            options={{
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 12
                    }
                },
                scales: {
                    xAxes: [{
                       gridLines: {
                        display: true,
                        color : 'rgb(130,130,130)'
                       },
                       ticks: {
                        fontColor: "white",
                      }
                    }],
                    yAxes: [{
                       gridLines: {
                        display: true,
                        color : 'rgb(130,130,130)'
                       },
                       ticks: {
                        fontColor: "white",
                      }
                    }]
                 }
            }}
            data={{
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data : dailyData.map(({confirmed}) => confirmed),
                    label : "Infected",
                    borderColor : '#3333ff',
                    fill : true
                } , {
                    data : dailyData.map(({deaths}) => deaths),
                    label : "Deaths",
                    borderColor : 'red',
                    backgroundColor : 'rgb(255 , 0 , 0)',
                    fill : true
                }]
            }}
        /> : null
    )

    const barChart = (
        data.confirmed
        ? (
            <Bar 
                data={{
                    labels : ['infected' , 'recovered' , 'deaths'],
                    datasets : [{
                        label : 'People',
                        backgroundColor : [
                            'rgb(0,0,255)',
                            'rgb(0,255,0)',
                            'rgb(255,0,0)'
                        ],
                        data : [data.confirmed.value , data.recovered.value , data.deaths.value]
                    }]
                }}
                options = {{
                    legend: {
                        display : false,
                        labels: {
                            fontColor: "white",
                            fontSize: 12
                        }
                    },
                    scales: {
                        xAxes: [{
                           gridLines: {
                              display: true,
                              color : 'rgb(130,130,130)'
                           },
                           ticks: {
                            fontColor: "white",
                          }
                        }],
                        yAxes: [{
                           gridLines: {
                              display: true,
                              color : 'rgb(130,130,130)'
                           },
                           ticks: {
                            fontColor: "white",
                          }
                        }]
                    },
                    title : {display:true , text:`Current state in ${country}` , fontColor:"white"}
                }}
            />
        )
        : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart
