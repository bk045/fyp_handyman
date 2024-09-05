import React from "react";
import {Chart as ChartJs,
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend} from 'chart.js';

import {Bar} from 'react-chartjs-2';

ChartJs.register(BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend);
const BarChart = ({bottomLabelList, topLabelList, dataList, borderColor, borderWidth, colorList, title}) => {
    const getDataSets = ()=>{
        let dataSet=[]
        for (let i = 0; i < topLabelList.length; i++) {
            console.log('Top Label', topLabelList[i])
            dataSet= [...dataSet, {'label':topLabelList[i], 
                                    'data': dataList[i], 
                                    'backgroundColor': colorList[i],
                                    'borderColor':borderColor,
                                    'borderWidth':borderWidth
                                }
                    ];
          }
        return dataSet
    }
    const dataSet = getDataSets()
    const data = {
        labels:bottomLabelList,
        datasets:[
            ...dataSet
        ]
    };
    console.log(dataSet)
    const options = {}
    return ( <>
                <h4 className="mb-5">{title}</h4>
                <div><Bar
                    data={data}
                    options={options}
                    >
                    </Bar></div>
            </> );
}
export default BarChart;

