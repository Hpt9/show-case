import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Comment from "../ph/comment.svg"
import Message from "../ph/message.svg"
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LOADING from "../ph/loadingAni.gif"
import { useState,useEffect } from "react";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function InProgress({ data }: any) {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if(data){
      if(data){
        setTimeout(()=>setIsLoading(false),500)
      }
    }
  }, [data]);
  if (isLoading) {
    return <div style={{width:"100%",display:"flex",justifyContent:"center"}}><img src={LOADING} alt="Loading" /></div>;
  }
  
    return (
        <div className="InQueueDiv">
          {data &&
            data.map((el: any, index: number) => (
              <motion.div
              key={index+123132132123+"r"}
              initial={{opacity:0.5,scale:0.5}}
              animate={{opacity:1,scale:1}}
              transition={{ duration: 0.05*index/2+0.05 }}
              
              >
                <h1>{el.taskName}</h1>
                <p>{el.taskDesc}</p>
                <div className="platforms">
                  {el.platforms &&
                    el.platforms.map((e: any, i: any) => (
                      <span key={i+321321233123123+"r"} className={`${e} plat`}>{e}</span>
                    ))}
                </div>
                <BorderLinearProgress variant="determinate" value={el.progress} />
                <div className="pr">
                    <span>{t("Task.tabs.t2")}</span>
                    <span>{el.progress}%</span>
                </div>
                <div className="activity_bar">
                    <AvatarGroup total={3}>
                        <Avatar alt="Remy Sharp" src="" />
                        <Avatar alt="Travis Howard" src="" />
                        <Avatar alt="Agnes Walker" src="" />
                    </AvatarGroup>
                    <div className="emessage">
                        <div>
                            <img src={Comment} alt="" />
                            <span>{el.commentC}</span>
                        </div>
                        <div>
                            <img src={Message} alt="" />
                            <span>{el.messageC}</span>
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
        </div>
      );
}



