import {useState,useRef,useMemo,useCallback} from "react";
import {
  Eventcalendar,
  MbscEventcalendarView,
  setOptions,
  Popup,
  Button,
  formatDate,
  Toast,
} from "@mobiscroll/react";
import { doctors,defaultAppointments } from "../exportedArrays";
import { motion} from "framer-motion";

export default function Today() {
  setOptions({
    theme: "ios",
    themeVariant: "light",
  });
  const [appointments, setAppointments] =
    useState<any>(defaultAppointments);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<any>(null);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [closeOnOverlay, setCloseOnOverlay] = useState(false);
  const [info, setInfo] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("");
  const [buttonType, setButtonType] = useState<any>("");
  const [bgColor, setBgColor] = useState<string>("");
  const timerRef = useRef<any>(null);
  const [isToastOpen, setToastOpen] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>();

  const view = useMemo<MbscEventcalendarView>(() => {
    return {
      schedule: {
        type: "week",
        startDay: 3,
        endDay: 3,
        startTime: "08:00",
        endTime: "19:00",
        allDay: false,
      },
    };
  }, []);

  const openTooltip = useCallback((args : any, closeOption: any) => {
    const event = args.event;
    const resource = doctors.find((dr) => dr.id === event.resource);
    const time =
      formatDate("hh:mm A", new Date(event.start)) +
      " - " +
      formatDate("hh:mm A", new Date(event.end));

    setCurrentEvent(event);

    if (event.confirmed) {
      setStatus("Confirmed");
      setButtonText("Cancel appointment");
      setButtonType("warning");
    } else {
      setStatus("Canceled");
      setButtonText("Confirm appointment");
      setButtonType("success");
    }

    setBgColor(resource.color);
    setInfo(event.title + ", Age: " + event.age);
    setTime(time);
    setReason(event.reason);
    setLocation(event.location);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setAnchor(args.domEvent.currentTarget || args.domEvent.target);
    setCloseOnOverlay(closeOption);
    setOpen(true);
  }, []);

  const onEventHoverIn = useCallback(
    (args: any, closeOption: any) => {
      openTooltip(args, false);
    },
    [openTooltip]
  );

  const onEventHoverOut = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  const onEventClick = useCallback(() => {
    if (!isOpen) {
      openTooltip(args, true);
    }
  }, [openTooltip]);

  const onMouseEnter = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  const setStatusButton = useCallback(() => {
    setOpen(false);
    const index = appointments.findIndex(
      (item: any) => item.id === currentEvent.id
    );
    const newApp = [...appointments];
    newApp[index].confirmed = !appointments[index].confirmed;
    setAppointments(newApp);
    showToast(
      "Appointment " + (currentEvent.confirmed ? "confirmed" : "canceled")
    );
  }, [appointments, currentEvent]);

  const viewFile = useCallback(() => {
    setOpen(false);
    showToast("View file");
  }, []);
  const deleteApp = useCallback(() => {
    setAppointments(
      appointments.filter((item: any) => item.id !== currentEvent.id)
    );
    setOpen(false);
    showToast("Appointment deleted");
  }, [appointments, currentEvent]);

  const closeToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const showToast = useCallback((message: string) => {
    setToastText(message);
    setToastOpen(true);
  }, []);
  return (
    <motion.div className="today"
      initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Eventcalendar
        view={view}
        resources={doctors}
        data={appointments}
        clickToCreate={false}
        dragToCreate={false}
        showEventTooltip={false}
        onEventHoverIn={onEventHoverIn}
        onEventHoverOut={onEventHoverOut}
        onEventClick={onEventClick}
      />
      <Popup
        display="anchored"
        isOpen={isOpen}
        anchor={anchor}
        touchUi={false}
        showOverlay={false}
        contentPadding={false}
        closeOnOverlayClick={false}
        width={350}
        cssClass="md-tooltip"
      >
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <div
            className="md-tooltip-header"
            style={{ backgroundColor: bgColor }}
          >
            <span className="md-tooltip-name-age">{info}</span>
            <span className="md-tooltip-time">{time}</span>
          </div>
          <div className="md-tooltip-info">
            <div className="md-tooltip-title">
              Status:{" "}
              <span className="md-tooltip-status md-tooltip-text">
                {status}
              </span>
              <Button
                color={buttonType}
                variant="outline"
                className="md-tooltip-status-button"
                onClick={setStatusButton}
              >
                {buttonText}
              </Button>
            </div>
            <div className="md-tooltip-title">
              Reason for visit:{" "}
              <span className="md-tooltip-reason md-tooltip-text">
                {reason}
              </span>
            </div>
            <div className="md-tooltip-title">
              Location:{" "}
              <span className="md-tooltip-location md-tooltip-text">
                {location}
              </span>
            </div>
            <Button
              color="secondary"
              className="md-tooltip-view-button"
              onClick={viewFile}
            >
              View patient file
            </Button>
            <Button
              color="danger"
              variant="outline"
              className="md-tooltip-delete-button"
              onClick={deleteApp}
            >
              Delete appointment
            </Button>
          </div>
        </div>
      </Popup>
      <Toast message={toastText} isOpen={isToastOpen} onClose={closeToast} />
    </motion.div>
  );
}
