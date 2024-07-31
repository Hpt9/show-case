import Conversion from './Conversion'
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
