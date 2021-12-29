export function getAppointmentsForDay(state, day) {
  //console.log("STATE", state);
  const target = day;
  let resultDay = state.days.filter((days) => days.name === target);
  resultDay = resultDay[0];
  //console.log("result", resultDay)
  if (resultDay) {
    const appointArray = [];
    //console.log(resultDay.appointments)
    for (let item in state.appointments) {
      //console.log("APPOINT", state.appointments[item])
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

    //console.log(appointArray);
    const app = appointArray.filter(filterAppoint);
    //console.log(app)
    return app;
  }
  //console.log("FAIL :(")
  return [];
}

export function getInterview(state, interview) {
  
  if(interview) {
    const interviewId = interview.interviewer;
    const interviewerInfo = state.interviewers[interviewId];
    //console.log("STATE", interviewerInfo)
    interview.interviewer = interviewerInfo;
    return interview;
  } 
  return null;
  
};
