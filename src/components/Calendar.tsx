import "../scss/ChartCalendar.scss"
import dayjs from 'dayjs';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import YWatch from "../assets/photos/yellowWatch.svg"
import { useTranslation } from "react-i18next";
export default function Calendar() {
  const {t} = useTranslation();
  const date= new Date();
  return (
    <div className="calendar-div">
      <div className="blocker"></div>
        <p className='calendar-header'>{t("Home_Page.graphs.calendar.h1")}</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar defaultValue={dayjs(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)} readOnly />
        </LocalizationProvider>
        <div className="event-div">
            <div className="event-today">
              <div>
                <img src="https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" />
              </div>
              <div>
                <p>{t("Home_Page.graphs.calendar.p")}</p>
                <div>
                  <VideocamOutlinedIcon/>
                  <span>{t("Home_Page.graphs.calendar.sp")}</span>
                </div>
              </div>
              <div className="abc">
                <div>
                  <img src={YWatch} alt="" />
                  <span>9am</span>
                </div>
              </div>
            </div>

            <div className="event-today">
              <div>
                <img src="https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" />
              </div>
              <div>
                <p>{t("Home_Page.graphs.calendar.p")}</p>
                <div>
                  <VideocamOutlinedIcon/>
                  <span>{t("Home_Page.graphs.calendar.sp")}</span>
                </div>
              </div>
              <div className="abc">
                <div>
                  <img src={YWatch} alt="" />
                  <span>9am</span>
                </div>
              </div>
            </div>

            <div className="event-today">
              <div>
                <img src="https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" />
              </div>
              <div>
                <p>{t("Home_Page.graphs.calendar.p")}</p>
                <div>
                  <VideocamOutlinedIcon/>
                  <span>{t("Home_Page.graphs.calendar.sp")}</span>
                </div>
              </div>
              <div className="abc">
                <div>
                  <img src={YWatch} alt="" />
                  <span>9am</span>
                </div>
              </div>
            </div>

            <div className="event-today">
              <div>
                <img src="https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" />
              </div>
              <div>
                <p>{t("Home_Page.graphs.calendar.p")}</p>
                <div>
                  <VideocamOutlinedIcon/>
                  <span>{t("Home_Page.graphs.calendar.sp")}</span>
                </div>
              </div>
              <div className="abc">
                <div>
                  <img src={YWatch} alt="" />
                  <span>9am</span>
                </div>
              </div>
            </div>

            <div className="event-today">
              <div>
                <img src="https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" />
              </div>
              <div>
                <p>{t("Home_Page.graphs.calendar.p")}</p>
                <div>
                  <VideocamOutlinedIcon/>
                  <span>{t("Home_Page.graphs.calendar.sp")}</span>
                </div>
              </div>
              <div className="abc">
                <div>
                  <img src={YWatch} alt="" />
                  <span>9am</span>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
