export function getAppointmentsForDay(state, day) {
  const target = day;
  let resultDay = state.days.filter((days) => days.name === target);
  resultDay = resultDay[0];

  if (resultDay) {
    const appointArray = [];

    for (let item in state.appointments) {
      appointArray.push(state.appointments[item]);
    }

    const filterAppoint = (num) => {
      for (let item in resultDay.appointments) {
        if (num.id === resultDay.appointments[item]) {
          return resultDay.appointments[item];
        }
      }
      return false;
    };

    const app = appointArray.filter(filterAppoint);

    return app;
  }

  return [];
}
export function getInterviewersForDay(state, day) {
  const target = day;
  let resultDay = state.days.filter((days) => days.name === target);
  resultDay = resultDay[0];

  if (resultDay) {
    const interviewArray = [];

    for (let item in state.interviewers) {
      interviewArray.push(state.interviewers[item]);
    }

    const filterAppoint = (num) => {
      for (let item in resultDay.interviewers) {
        if (num.id === resultDay.interviewers[item]) {
          return resultDay.interviewers[item];
        }
      }
      return false;
    };

    const app = interviewArray.filter(filterAppoint);

    return app;
  }

  return [];
}

export function getInterview(state, interview) {
  let newInterview = {};
  if (interview) {
    const interviewId = interview.interviewer;
    const interviewerInfo = state.interviewers[interviewId];

    newInterview["interviewer"] = interviewerInfo;
    newInterview["student"] = interview.student;
    return newInterview;
  }
  return null;
}
