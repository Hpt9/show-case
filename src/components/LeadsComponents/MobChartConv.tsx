import React from 'react'
import Conversion from './Conversion'
import CircularProgress from '@mui/joy/CircularProgress';
import LeadsOver from './LeadsOver';


export default function MobChartConv() {
  return (
    <div className='mobChartConv_div'>
        <LeadsOver/>
        <div className='conversion'>
            <Conversion/>
        </div>
    </div>
  )
}
