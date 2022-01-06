export function getAppointmentsForDay(state, day) {
  const target = day;
  //transforming object into array
  //console.log("State-4", state.days);
  const objArray = Object.entries(state.days);
  //console.log("state-2", objArray["1"]);
  let resultDay = [];
  //console.log(typeof objArray)
  for (let item in objArray) {
    //console.log("OBJ ARRAY", objArray[item][1].name)

    if (objArray[item][1].name === target) {
      resultDay.push(objArray[item][1]);
    }
  }

  //console.log("RESULT DAY", resultDay);
  //filtering through array
  // let resultDay = objArray.filter((days) => days.name === target);
  // //change back to obj

  //console.log("state-3", resultDay)
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
  let resultDay = [];
  const objArray = Object.entries(state.days);

  for (let item in objArray) {
    if (objArray[item][1].name === target) {

      resultDay.push(objArray[item][1])
      //console.log("state-5", objArray[item][1]);
    }
  }

  // let resultDay = state.days.filter((days) => days.name === target);
  
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
