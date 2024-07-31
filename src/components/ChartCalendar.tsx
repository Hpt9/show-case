import "../scss/ChartCalendar.scss"
import Chart from './Chart'
import Calendar from './Calendar'

export default function ChartCalendar() {
  return (
    <div className='chart-cal-div'>
        <Chart/>
        <Calendar/>
    </div>
  )
}


//import React, { PureComponent } from 'react';
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';