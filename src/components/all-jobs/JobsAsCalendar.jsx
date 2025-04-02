import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Tippy from "@tippyjs/react";
import JobsAsList from "./JobsAsList";
import CalenderCard from "../cards/CalenderCard";
import { Link } from "react-router-dom";

const headerContent = (e) => {
  const day = e.text.slice(0, 2);
  return (
    <div className="custom-date">
      <h1>{day}</h1>
    </div>
  );
};

const renderEventContent = (e) => {
  const event = e.event._def.extendedProps;
  const newEvent = { ...event, id: e.event.id };
  return (
    <Tippy
      interactive={false}
      content={<CalenderCard content={newEvent} />}
      animation="scale"
      className="event-tippyy"
    >
      <Link to={`/job/${newEvent.id}`}>
        <h5 className="title">{event.compName}</h5>
      </Link>
    </Tippy>
  );
};

export default function JobsAsCalendar({ jobs, calendarJobList }) {
  const calendarRef = useRef();
  const date = new Date();
  const [activeDay, setActiveDay] = useState(
    date.toISOString().replace(/T.*$/, "")
  );
  const handleClick = (e) => {
    setActiveDay(e.dateStr);
  };

  function dayCellClassNames(e) {
    if (e.date.toISOString().replace(/T.*$/, "") === activeDay) {
      return ["active"];
    } else return [];
  }

  return (
    <div className="jobs-calendar">
      <FullCalendar
        ref={calendarRef}
        plugins={[interactionPlugin, dayGridPlugin]}
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "tuday next",
        }}
        customButtons={{
          tuday: {
            text: "tuday",
            click: () => setActiveDay(date.toISOString().replace(/T.*$/, "")),
          },
          next: {
            click: () => {
              calendarRef.current.getApi().next();
              console.log("next");
            },
          },
          prev: {
            click: () => {
              calendarRef.current.getApi().prev();
              console.log("prev");
            },
          },
        }}
        longPressDelay={0}
        initialView="dayGridMonth"
        editable={false}
        selectable={true}
        timeZone={false}
        locale="en"
        firstDay={1}
        dayMaxEvents={5}
        dateClick={handleClick}
        dayCellClassNames={dayCellClassNames}
        eventContent={renderEventContent}
        fixedWeekCount={false}
        eventBackgroundColor={true}
        dayHeaderContent={headerContent}
        // events={[
        //   {
        //     title: "event 1",
        //     calendarEndDate: "2024-03-01",
        //     calendarStartDate: "2024-03-02",
        //     // start: "2024-02-04",
        //     // end: "2024-04-05",
        //     date: "2024-03-18",
        //   },
        //   { title: "event 2", date: "2024-03-15" },
        // ]}
        events={calendarJobList.map((c) => {
          c.end = null;
          return c;
        })}
        // initialEvents={calendarJobList}
      />
      <div className="mobile">
        <div className="top">
          <p>{activeDay}</p>
          <span>{jobs.length}건</span>
        </div>

        <JobsAsList jobs={jobs} />
      </div>
    </div>
  );
}
