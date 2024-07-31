import {useState,useEffect} from 'react'
import Dot3 from "../ph/3dot.svg"
import InTakeEditMenu from './InTakeEditMenu';


export default function Pending({data,reloadActive}:any) {
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const openModal = () => {setIsModalOpen(true);};
    const closeModal = () => {setIsModalOpen(false);};
    useEffect(() => {
        const handleResize = () => {setIsMobileView(window.innerWidth < 800);};
        handleResize(); // Check initial width
        window.addEventListener('resize', handleResize);
        return () => {window.removeEventListener('resize', handleResize);};}, 
    [])
    function editClicked(id:string) {
        console.log(id)
        setSelectedItemId(id);
    }
  return (
    <div>
        {isMobileView ? (
                <div className='lead_mobile'>
                    {data && data.map((e,i)=>(
                        <div className="lead_mobile_user" key={i+"lop765tymmmv"}>
                            <div>
                                <div>
                                    <p>{e.name}</p>
                                    <p>{e.phone}</p>
                                </div>
                                <div onClick={()=>{editClicked(e.id);openModal()}}>
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
                        <div className="lead_pc_user"  key={i+"lopm76632ammv"}>
                            <div>{e.name}</div>
                            <div>{e.phone}</div>
                            <div className='sts'>
                                <span className={`${e.status}`} >
                                    <span className={`circle circle_${e.status}`}></span>
                                    {e.status}
                                </span>
                            </div>
                            <div onClick={()=>{editClicked(e.id);openModal()}}>
                                <img src={Dot3} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isModalOpen && (
                <div className="formToTask3">
                    <InTakeEditMenu id={selectedItemId} closeModal={closeModal} reloadActive={reloadActive} />
                </div>
            )}
    </div>
  )
}
