import React from "react";
import PieChart from "../common/PieChart";
import BarChart from "../common/BarChart";



const Chart = () => {
    const data = [3, 6, 9]
    const labels = ['One', 'Two', 'Three']
    const color = ['aqua', 'orangered', 'purple']
    return ( <>
                <div className="max-w-4xl">
                    {/* <PieChart dataList={data} labelsList={labels} colorList={color} title={"First Chart"}/> */}
                    <BarChart dataList={data} labelsList={labels} colorList={color} title={"First Chart"}></BarChart>
                </div>
            </> );
}
 
export default Chart;