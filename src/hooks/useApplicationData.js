import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  //setState({ ...state, day: "Tuesday" });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const calculateSpots = (book = false, cancel = false) => {
    //console.log("id", id)

    for (let item in state.days) {
      if (state.days[item].name === state.day) {
        if (book) {
          let spotsCalc = (state.days[item].spots -= 1);

          const days = {
            ...state.days,
            ...(state.days[item].spots = spotsCalc),
          };

          setState((prev) => ({ ...prev, days }));
          //console.log(state.days[item].spots -= 1)
        }
        if (cancel) {
          let spotsCalc = (state.days[item].spots += 1);

          const days = {
            ...state.days,
            ...(state.days[item].spots = spotsCalc),
          };
          setState((prev) => ({ ...prev, days }));
        }
      }
    }
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((response) => {
        calculateSpots(true);
        setState((prev) => ({ ...prev, appointments }));
      });
  }

  const cancelInterview = (id, interview) => {
    console.log("cancel interview", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //console.log("CANCEL", appointments);
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        calculateSpots(false, true);
        setState((prev) => ({ ...prev, appointments }));
      });
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
  return { state, setDay, bookInterview, cancelInterview };
}
