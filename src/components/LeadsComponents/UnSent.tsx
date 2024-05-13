import React,{useState,useEffect} from 'react'
import Dot3 from "../ph/3dot.svg"
export default function UnSent({data}:any) {
    const [isMobileView, setIsMobileView] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {setIsMobileView(window.innerWidth < 800);};
        handleResize(); // Check initial width
        window.addEventListener('resize', handleResize);
        return () => {window.removeEventListener('resize', handleResize);};}, 
    [])
  return (
    <div>
        {isMobileView ? (
                <div className='lead_mobile'>
                    {data && data.map((e,i)=>(
                        <div className="lead_mobile_user" key={i+"lopm3kmmmv"}>
                            <div>
                                <div>
                                    <p>{e.name}</p>
                                    <p>{e.phone}</p>
                                </div>
                                <div>
                                    <img src={Dot3} alt="" />
                                </div>
                            </div>
                            <div>
                                <p>Status</p>
                                <div className='sts'>
                                    <span className={`${e.status}`} >
                                        <span className={`circle circle_${e.status}`}></span>
                                        {e.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ):(
                <div className='lead_pc'>
                    {data && data.map((e,i)=>(
                        <div className="lead_pc_user"  key={i+"lop098jummmv"}>
                            <div>{e.name}</div>
                            <div>{e.phone}</div>
                            <div className='sts'>
                                <span className={`${e.status}`} >
                                    <span className={`circle circle_${e.status}`}></span>
                                    {e.status}
                                </span>
                            </div>
                            <div>
                                <img src={Dot3} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
    </div>
  )
}
