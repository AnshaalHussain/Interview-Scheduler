import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Appointment";
import axios from "axios";

import "components/Application.scss";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "./helpers/selectors";

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  //setState({ ...state, day: "Tuesday" });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((response) => setState((prev) => ({ ...prev, appointments })));
  }

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    console.log("CANCEL", interview)
    axios
      .put(`http://localhost:8001/api/appointments/${id}`, null)
      .then((response) => setState((prev) => ({ ...prev, appointments })));
  };

  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      console.log("ALL", all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  let dailyAppointments = getAppointmentsForDay(state, state.day);

  const newArray = dailyAppointments.map((data) => {
    const interview = getInterview(state, data.interview);

    let dailyInterviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={data.id}
        {...data}
        interview={interview}
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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {newArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
