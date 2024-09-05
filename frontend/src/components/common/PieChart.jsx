import React from "react";
import {Chart as ChartJs,
        ArcElement,
        Tooltip,
        Legend} from 'chart.js';

import {Pie} from 'react-chartjs-2';

ChartJs.register(ArcElement, Tooltip, Legend);


const PieChart = ({labelsList, dataList, colorList, title}) => {
    const data = {
        labels:labelsList,
        datasets:[
            {
                data: dataList,
                backgroundColor: colorList
            }
        ]
    };
    const options = {}
    return ( <>
                <h4 className="mb-5">{title}</h4>
                <div style={{width:"100%", height:"100%"}}><Pie
                    data={data}
                    options={options}
                    >
                    </Pie></div>
            </> );
}
 
export default PieChart;