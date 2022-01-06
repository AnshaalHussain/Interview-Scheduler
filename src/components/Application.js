import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Appointment";


import "components/Application.scss";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "./helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  console.log("listen", state)
  let dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointments = dailyAppointments.map((data) => {

    let dailyInterviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={data.id}
        {...data}
        interview={getInterview(state, data.interview)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        interviewers={dailyInterviewers}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
