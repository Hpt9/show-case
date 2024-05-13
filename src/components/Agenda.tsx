import React from 'react'
import {
    Eventcalendar,
    getJson,
    Toast,
    MbscCalendarEvent,
    MbscEventcalendarView,
  } from "@mobiscroll/react";
  import "../scss/Calendar.scss"
  import { motion} from "framer-motion";

export default function Agenda() {
    const [myEvents, setEvents] = React.useState<MbscCalendarEvent[]>([]);
    const [isToastOpen, setToastOpen] = React.useState<boolean>(false);
    const [toastText, setToastText] = React.useState<string>();

    React.useEffect(() => {
      getJson(
        "https://trial.mobiscroll.com/events/?vers=5",
        (events: MbscCalendarEvent[]) => {
          setEvents(events);
        },
        "jsonp"
      );
      setToastText("")
    }, []);
  
    const closeToast = React.useCallback(() => {
      setToastOpen(false);
    }, []);
    const view = React.useMemo<MbscEventcalendarView>(() => {
      return {
        calendar: { type: "month" },
        agenda: { type: "day" },
      };
    }, []);
  return (
    <motion.div
    initial={{ translateX: -100, opacity: 0 }}
    animate={{ translateX: 0, opacity: 1 }}
    exit={{ translateX: -100, opacity: 0 }}
    transition={{ duration: 0.2 }}
    >
        <Eventcalendar
        theme="ios"
        themeVariant="light"
        data={myEvents}
        view={view}
        //onEventClick={onEventClick}
      />
      <Toast
        theme="ios"
        themeVariant="light"
        message={toastText}
        isOpen={isToastOpen}
        onClose={closeToast}
      />
    </motion.div>
  )
}
