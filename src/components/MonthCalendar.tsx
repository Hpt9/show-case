import {
    Eventcalendar,
    getJson,
    Toast,
    MbscCalendarEvent,
    MbscEventcalendarView,
    MbscEventClickEvent,
  } from '@mobiscroll/react';
  import React from 'react';
  import { motion} from "framer-motion";

  const MonthEventCalendar: React.FC = () => {
    const [myEvents, setEvents] = React.useState<MbscCalendarEvent[]>([]);
    const [isToastOpen, setToastOpen] = React.useState<boolean>(false);
    const [toastText, setToastText] = React.useState<string>();
  
    React.useEffect(() => {
      getJson(
        'https://trial.mobiscroll.com/events/?vers=5',
        (events: MbscCalendarEvent[]) => {
          setEvents(events);
        },
        'jsonp',
      );
    }, []);
  
    const closeToast = React.useCallback(() => {
      setToastOpen(false);
    }, []);
  
    const onEventClick = React.useCallback((event: MbscEventClickEvent) => {
      setToastText(event.event.title);
      setToastOpen(true);
    }, []);
  
    const view = React.useMemo<MbscEventcalendarView>(() => {
      return {
        calendar: { labels: true },
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
          clickToCreate={false}
          dragToCreate={false}
          dragToMove={false}
          dragToResize={false}
          eventDelete={false}
          data={myEvents}
          view={view}
          onEventClick={onEventClick}
        />
        <Toast message={toastText} isOpen={isToastOpen} onClose={closeToast} />
      </motion.div>
    );
  };
  export default MonthEventCalendar;