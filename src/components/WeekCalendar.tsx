import {
  Eventcalendar,
  getJson,
  Toast,
  Button,
  setOptions,
  MbscCalendarEvent,
  MbscCalendarEventData,
} from "@mobiscroll/react";
import React from "react";
import { motion} from "framer-motion";

setOptions({
  theme: "ios",
  themeVariant: "light",
});
import "../scss/WeekCalender.scss";
const WeekCalendar: React.FC = () => {
  const [myEvents, setEvents] = React.useState<MbscCalendarEvent[]>([]);
  const [isToastOpen, setToastOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/multi-events/",
      (events: MbscCalendarEvent[]) => {
        setEvents(events);
      },
      "jsonp"
    );
  }, []);

  const [resp, setResp] = React.useState({
    xsmall: {
      view: {
        schedule: {
          type: "day",
        },
      },
    },
    medium: {
      view: {
        schedule: {
          type: "week",
        },
      },
    },
  });

  const closeToast = React.useCallback(() => {
    setToastOpen(false);
  }, []);

  const getCategory = (id: number) => {
    switch (id) {
      case 1:
        return {
          name: "Project X",
          color: "#ff825d",
        };
      case 2:
        return {
          name: "Stakeholder Mtg.",
          color: "#bd75d0",
        };
      case 3:
        return {
          name: "Status Update",
          color: "#7f9230",
        };
      case 4:
        return {
          name: "Information Sharing",
          color: "#f14590",
        };
      case 5:
        return {
          name: "Team Building",
          color: "#64cad4",
        };
      default:
        return {
          name: "",
          color: "",
        };
    }
  };

  const getParticipant = (id: number) => {
    switch (id) {
      case 1:
        return {
          name: "Lisa",
          img: "https://img.mobiscroll.com/demos/f1.png",
        };
      case 2:
        return {
          name: "Sharon",
          img: "https://img.mobiscroll.com/demos/f2.png",
        };
      case 3:
        return {
          name: "Emily",
          img: "https://img.mobiscroll.com/demos/f3.png",
        };
      case 4:
        return {
          name: "Rose",
          img: "https://img.mobiscroll.com/demos/f4.png",
        };
      case 5:
        return {
          name: "Matt",
          img: "https://img.mobiscroll.com/demos/m1.png",
        };
      case 6:
        return {
          name: "Rick",
          img: "https://img.mobiscroll.com/demos/m2.png",
        };
      case 7:
        return {
          name: "John",
          img: "https://img.mobiscroll.com/demos/m3.png",
        };
      case 8:
        return {
          name: "Ethan",
          img: "https://img.mobiscroll.com/demos/m4.png",
        };
      default:
        return {
          name: "",
          img: "",
        };
    }
  };

  const edit = () => {
    setToastOpen(true);
  };

  const renderScheduleEvent = React.useCallback<
    (data: MbscCalendarEventData) => any
  >((data: MbscCalendarEventData) => {
    const original = data.original!;
    const cat = getCategory(original.category);
    if (data.allDay) {
      return (
        <div
          style={{ background: cat.color }}
          className="md-custom-event-allday-title"
        >
          {data.title}
        </div>
      );
    } else {
      return (
        <div
          className="md-custom-event-cont"
          style={{
            borderLeft: "5px solid " + cat.color,
            background: cat.color,
          }}
        >
          <div className="md-custom-event-wrapper">
            <div
              style={{ background: cat.color }}
              className="md-custom-event-category"
            >
              {cat.name}
            </div>
            <div className="md-custom-event-details">
              <div className="md-custom-event-title">{data.title}</div>
              <div className="md-custom-event-time">
                {data.start} - {data.end}
              </div>
              <Button
                className="md-custom-event-btn"
                color="dark"
                variant="outline"
                onClick={edit}
              >
                Edit
              </Button>
              <div className="md-cutom-event-img-cont">
                {original.participants.map(function (p: any) {
                  return (
                    <img
                      key={p}
                      className="md-custom-event-img"
                      src={getParticipant(p).img}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }, []);

  return (
    <motion.div
    initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Eventcalendar
        renderScheduleEvent={renderScheduleEvent}
        responsive={resp}
        data={myEvents}
      />
      <Toast
        theme="ios"
        themeVariant="light"
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        eventDelete={true}
        message="Edit clicked"
        isOpen={isToastOpen}
        onClose={closeToast}
      />
    </motion.div>
  );
};

export default WeekCalendar;
