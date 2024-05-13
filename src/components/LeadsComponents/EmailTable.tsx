import {useState,useEffect} from 'react'
import Dot3 from "../ph/3dot.svg"
export default function EmailTable({data}:any) {
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
                    {data && data.map((e:any,i:any)=>(
                        <div className="lead_mobile_user" key={i+"lop765tymmmv"}>
                            <div>
                                <div>
                                    <img src={e.img} alt="" />
                                    <div>
                                        <p>{e.contact}</p>
                                        <p>{e.type}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={Dot3} alt="" />
                                </div>
                            </div>
                            <div>
                                <p>Message</p>
                                <p>{e.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ):(
                <div className='lead_pc'>
                    {data && data.map((e:any,i:any)=>(
                        <div className="lead_pc_user"  key={i+"lopm76632ammv"}>
                            <div>{e.contact}</div>
                            <div>{e.type}</div>
                            <div>{e.message}</div>
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
