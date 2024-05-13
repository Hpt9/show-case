import "../scss/AddItem.scss"
import { useContext } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { isLoggedContext } from '../App';
export default function AddItem() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const { setActiveIndex } = useContext(isLoggedContext);
    const arrayOfItems=[
        {
          name:t('Home_Page.item_names.first.name'),
          img:(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5.81154 0H4.18983C4.11519 0 4.05469 0.0589131 4.05469 0.131586V3.28965C4.05469 3.36232 4.11519 3.42124 4.18983 3.42124H5.81154C5.88618 3.42124 5.94668 3.36232 5.94668 3.28965V0.131586C5.94668 0.0589131 5.88618 0 5.81154 0Z" fill="#2C60EA"/>
          <path d="M18.7578 2.36719H16.7577V3.20934C16.7577 3.70937 16.3793 4.20939 15.8657 4.20939H14.271C14.0049 4.19103 13.7544 4.07977 13.5658 3.89606C13.3771 3.71234 13.2628 3.4685 13.244 3.20934V2.36719H6.75712V3.20934C6.73826 3.4685 6.624 3.71234 6.43532 3.89606C6.24663 4.07977 5.99621 4.19103 5.73004 4.20939H4.13536C3.62182 4.20939 3.24342 3.70937 3.24342 3.20934V2.36719H1.24331C0.911102 2.37407 0.594888 2.50742 0.362467 2.73864C0.130047 2.96987 -7.51871e-05 3.28056 3.25934e-08 3.6041V6.84111H20.0011V3.6041C20.0012 3.28056 19.871 2.96987 19.6386 2.73864C19.4062 2.50742 19.09 2.37407 18.7578 2.36719Z" fill="#2C60EA"/>
          <path d="M15.8115 0H14.1898C14.1152 0 14.0547 0.0589131 14.0547 0.131586V3.28965C14.0547 3.36232 14.1152 3.42124 14.1898 3.42124H15.8115C15.8862 3.42124 15.9467 3.36232 15.9467 3.28965V0.131586C15.9467 0.0589131 15.8862 0 15.8115 0Z" fill="#2C60EA"/>
          <path d="M7.97233 14.6872L7.59393 16.8189L9.53998 15.8189L9.72918 15.7662L9.91838 15.8189L11.8644 16.8189L11.486 14.6872C11.4789 14.626 11.4848 14.564 11.5034 14.5052C11.522 14.4463 11.5529 14.3918 11.5941 14.3451L13.1888 12.8713L10.9995 12.5555C10.9364 12.5457 10.8766 12.5215 10.8249 12.485C10.7733 12.4484 10.7312 12.4004 10.7022 12.345L9.72918 10.4238L8.75615 12.345C8.72714 12.4004 8.68508 12.4484 8.63341 12.485C8.58174 12.5215 8.52193 12.5457 8.45884 12.5555L6.26953 12.8713L7.86421 14.3451C7.90545 14.3918 7.93634 14.4463 7.95494 14.5052C7.97354 14.564 7.97946 14.626 7.97233 14.6872Z" fill="#2C60EA"/>
          <path d="M0 18.8157C0.00706774 19.1322 0.141173 19.4334 0.373577 19.6547C0.605981 19.8761 0.918194 20 1.24331 19.9999H18.7578C19.0829 20 19.3951 19.8761 19.6275 19.6547C19.8599 19.4334 19.994 19.1322 20.0011 18.8157V7.63086H0V18.8157ZM5.0273 12.4732C5.04839 12.4029 5.0905 12.3404 5.14827 12.2935C5.20604 12.2466 5.27684 12.2176 5.35164 12.2101L8.13557 11.789L9.37889 9.34148C9.41443 9.28135 9.46563 9.2314 9.52732 9.19667C9.589 9.16195 9.659 9.14366 9.73026 9.14366C9.80151 9.14366 9.87151 9.16195 9.93319 9.19667C9.99488 9.2314 10.0461 9.28135 10.0816 9.34148L11.3249 11.789L14.1089 12.2101C14.1837 12.2176 14.2545 12.2466 14.3122 12.2935C14.37 12.3404 14.4121 12.4029 14.4332 12.4732C14.4572 12.5421 14.4597 12.6163 14.4405 12.6865C14.4213 12.7568 14.3811 12.8199 14.3251 12.868L12.325 14.7628L12.8115 17.4735C12.8207 17.5434 12.8105 17.6145 12.782 17.6792C12.7535 17.744 12.7077 17.8002 12.6493 17.8419C12.5783 17.8916 12.4935 17.9191 12.4061 17.9209C12.3385 17.9271 12.2709 17.9083 12.2169 17.8683L9.73026 16.605L7.24363 17.8683C7.17746 17.9075 7.1005 17.926 7.02315 17.9213C6.94581 17.9166 6.87182 17.8889 6.81118 17.8419C6.75282 17.8002 6.70701 17.744 6.67849 17.6792C6.64997 17.6145 6.63979 17.5434 6.64901 17.4735L7.13552 14.7628L5.13541 12.868C5.0794 12.8199 5.03925 12.7568 5.02001 12.6865C5.00078 12.6163 5.00331 12.5421 5.0273 12.4732Z" fill="#2C60EA"/>
          </svg>),
          text:t('Home_Page.item_names.first.desc')
        },
        {
          name:t('Home_Page.item_names.second.name'),
          img:(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
          <path d="M1.21933 16.1744L7.23574 18.2692V3.74942C7.23574 2.82901 7.97156 2.08287 8.87923 2.08287H12.5228L6.72955 0.0476007C6.52386 -0.0263169 6.29756 -0.013745 6.10106 0.0825154C5.90457 0.178776 5.7542 0.350728 5.68346 0.560065L0.708208 15.1103C0.635825 15.3201 0.649101 15.5505 0.745085 15.7503C0.84107 15.9502 1.01181 16.1028 1.21933 16.1744Z" fill="#2C60EA"/>
          <path d="M19.1516 14.5801C18.6977 14.5801 18.3298 14.9531 18.3298 15.4134V19.4072L23.0902 14.5801H19.1516Z" fill="#2C60EA"/>
          <path d="M15.8635 3.74982C16.5442 3.74982 17.0961 3.19022 17.0961 2.49991C17.0961 1.8096 16.5442 1.25 15.8635 1.25C15.1827 1.25 14.6309 1.8096 14.6309 2.49991C14.6309 3.19022 15.1827 3.74982 15.8635 3.74982Z" fill="#2C60EA"/>
          <path d="M8.04907 3.75124V19.1668C8.04907 19.627 8.41698 20.0001 8.87082 20.0001H17.4991V15.4171C17.4991 14.4967 18.235 13.7505 19.1426 13.7505H23.6622V3.75124C23.6622 3.29104 23.2943 2.91797 22.8405 2.91797H17.8689C17.6745 3.88887 16.8327 4.58661 15.8557 4.58661C14.8786 4.58661 14.0368 3.88887 13.8424 2.91797H8.87082C8.41698 2.91797 8.04907 3.29104 8.04907 3.75124ZM10.1034 5.83443H12.9795C13.2065 5.83443 13.3904 6.02097 13.3904 6.25107C13.3904 6.48117 13.2065 6.66771 12.9795 6.66771H10.1034C9.87652 6.66771 9.69256 6.48117 9.69256 6.25107C9.69256 6.02097 9.87652 5.83443 10.1034 5.83443ZM10.1034 7.91762H20.3752C20.6022 7.91762 20.7861 8.10415 20.7861 8.33426C20.7861 8.56436 20.6022 8.75089 20.3752 8.75089H10.1034C9.87652 8.75089 9.69256 8.56436 9.69256 8.33426C9.69256 8.10415 9.87652 7.91762 10.1034 7.91762ZM10.1034 10.0008H20.3752C20.6022 10.0008 20.7861 10.1873 20.7861 10.4174C20.7861 10.6475 20.6022 10.8341 20.3752 10.8341H10.1034C9.87652 10.8341 9.69256 10.6475 9.69256 10.4174C9.69256 10.1873 9.87652 10.0008 10.1034 10.0008ZM10.1034 12.084H20.3752C20.6022 12.084 20.7861 12.2705 20.7861 12.5006C20.7861 12.7307 20.6022 12.9173 20.3752 12.9173H10.1034C9.87652 12.9173 9.69256 12.7307 9.69256 12.5006C9.69256 12.2705 9.87652 12.084 10.1034 12.084ZM10.1034 15.8337H11.7469C11.9738 15.8337 12.1578 16.0203 12.1578 16.2504C12.1578 16.4805 11.9738 16.667 11.7469 16.667H10.1034C9.87652 16.667 9.69256 16.4805 9.69256 16.2504C9.69256 16.0203 9.87652 15.8337 10.1034 15.8337Z" fill="#2C60EA"/>
        </svg>),
          text:t('Home_Page.item_names.second.desc')
        },
        {
          name:t('Home_Page.item_names.third.name'),
          img:(<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
          <path d="M10.6599 4C12.8599 4 14.6599 5.8 14.6599 8C14.6599 10.2 12.8599 12 10.6599 12C8.45991 12 6.65991 10.2 6.65991 8C6.65991 5.8 8.45991 4 10.6599 4ZM17.6599 21L19.4599 22.77C19.9599 23.27 20.6599 22.87 20.6599 22.28V18L23.4599 14.6C23.5713 14.4514 23.6392 14.2748 23.6559 14.0898C23.6726 13.9048 23.6374 13.7189 23.5543 13.5528C23.4713 13.3867 23.3436 13.247 23.1856 13.1493C23.0277 13.0517 22.8456 13 22.6599 13H15.6599C14.8599 13 14.3599 14 14.8599 14.6L17.6599 18V21ZM15.6599 18.7L13.3599 15.9C12.9599 15.4 12.7599 14.8 12.7599 14.2C12.0599 14 11.3599 14 10.6599 14C6.25991 14 2.65991 15.8 2.65991 18V20H15.6599V18.7Z" fill="#2C60EA"/>
        </svg>),
          text:t('Home_Page.item_names.third.desc')
        },
        {
          name:t('Home_Page.item_names.fourth.name'),
          img:(<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
          <path d="M16.051 11.5771C16.0277 12.5959 14.5181 13.4184 12.6569 13.4184C10.7964 13.4184 9.28608 12.5959 9.264 11.5771C6.4176 11.8371 4.18848 11.5771 4.18848 17.1439C4.18848 19.8293 6.08232 20.0515 8.6076 20.064C8.70744 19.9567 8.81832 19.8523 8.9448 19.7511C9.54072 19.2759 10.0541 19.0543 10.56 19.0543C11.0674 19.0543 11.436 19.2675 11.7113 19.4974C11.8742 19.3745 12.1157 19.1712 12.4534 18.8359C12.793 18.4995 12.9996 18.2583 13.1251 18.0919C12.6295 17.4605 12.3744 16.5948 13.3946 15.3353C13.8715 14.7456 14.4115 14.4468 14.9995 14.4468C15.805 14.4468 16.337 15.0111 16.6598 15.3531C16.699 15.3953 16.7371 15.4354 16.7729 15.4714C17.6726 16.3781 17.2889 18.2422 15.9463 20.0635C16.1076 20.064 16.2713 20.0645 16.4287 20.0645C19.0922 20.0645 21.127 19.9277 21.127 17.1439C21.1267 11.5771 18.8966 11.8366 16.051 11.5771Z" fill="#2C60EA"/>
          <path d="M12.6579 12.3072C15.2328 12.3072 17.3194 8.43572 17.3194 5.86196C17.3194 3.28724 15.2326 1.2002 12.6579 1.2002C10.0834 1.2002 7.99658 3.28724 7.99658 5.86196C7.99658 8.43596 10.0836 12.3072 12.6579 12.3072Z" fill="#2C60EA"/>
          <path d="M16.1775 16.0628C16.1348 16.0193 16.0911 15.9735 16.0462 15.9257C15.7779 15.6411 15.4438 15.2861 14.9996 15.2861C14.6722 15.2861 14.3607 15.4753 14.0466 15.8633C13.2138 16.8917 13.5116 17.3302 14.0226 17.8385L14.0998 17.9151C14.144 17.9597 14.109 18.134 13.9266 18.4112C13.7478 18.6843 13.4514 19.0275 13.0431 19.4321C12.0769 20.3909 11.6955 20.4946 11.5765 20.4946C11.5366 20.4946 11.5261 20.4831 11.5194 20.4766L11.4428 20.3993C11.1999 20.1509 10.9486 19.8939 10.5598 19.8939C10.2546 19.8939 9.90633 20.0576 9.46737 20.4077C9.08985 20.7094 8.89953 21.0094 8.88537 21.326C8.86473 21.7849 9.22617 22.1305 9.51489 22.4084C9.56337 22.4537 9.60897 22.4981 9.65217 22.5418C9.82017 22.7105 10.087 22.801 10.4235 22.801C11.2294 22.801 12.7273 22.2488 14.2959 20.6926C16.2176 18.7837 16.8301 16.7206 16.1775 16.0628Z" fill="#2C60EA"/>
        </svg>),
          text:t('Home_Page.item_names.fourth.desc')
        }
    ]
    const handleItemClick = (index:any) => {
      switch (index) {
          case 0:
              navigate('/calendar');
              sessionStorage.setItem("activeIndex","1")
              setActiveIndex(1);
              break;
          case 1:
              navigate('/task');
              sessionStorage.setItem("activeIndex","2")
              setActiveIndex(2);
              break;
          case 2:
              navigate('/leads');
              sessionStorage.setItem("activeIndex","6")
              setActiveIndex(6);
              break;
          case 3:
              navigate('/contacts');
              sessionStorage.setItem("activeIndex","3")
              setActiveIndex(3);
              break;
          default:
              break;
      }
    };
    const divs = arrayOfItems.map((item,o) => {
        return <motion.div className="item"
                onClick={() => {
                  handleItemClick(o)

                }}
                key={o+"plyfr"}
                initial={{ opacity: 0 , scale:0}}
                animate={{ opacity: 1, scale:1 }}
                >
            <span>{item.img}</span>
            <div>
                <p>{item.name}</p>
                <p>{item.text}</p>
            </div>
        </motion.div>;
    });
  return (
    <div className='add-div'>
        <div>
            <p className="add-head">{t('Home_Page.item_names.add_item')}</p>
            <div className="items">
                {divs.map((div) => {
                    return div;
                })}
                {/* <motion.div className="item sItem"
                    initial={{ opacity: 0 , scale:0}}
                    animate={{ opacity: 1, scale:1 }}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                    <path d="M15.6531 6.5625V23.4375M24.0906 15H7.21558" stroke="#2C60EA" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                </svg>
                </motion.div> */}
            </div>
        </div>
    </div>
  )
}
