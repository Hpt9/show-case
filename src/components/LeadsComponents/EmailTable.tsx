import {useState,useEffect} from 'react'
import Dot3 from "../ph/3dot.svg"
import CommunicationEditModal from './CommunicationEditModal';

export default function EmailTable({data,reloadActive}:any) {
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    function editClicked(id:string) {
        console.log(id)
        setSelectedItemId(id);
      }
      function openModal() {
        setIsModalOpen(true);
      }
      
      function closeModal() {
        setIsModalOpen(false);
      }
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
                                <div onClick={el=>{editClicked(e.id);openModal()}}>
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
                            <div onClick={el=>{editClicked(e.id);openModal()}}>
                                <img src={Dot3} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isModalOpen && (
                <div className="formToTask3">
                    <CommunicationEditModal id={selectedItemId} closeModal={closeModal} reloadActive={reloadActive}/>
                </div>
            )}
    </div>
  )
}
