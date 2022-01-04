import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Status from "components/Appointment/Status";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    //console.log("mode", mode)
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    props.cancelInterview(props.id, interview);

  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onDelete={cancel}
        />
      )}
      {mode === SAVING && (
        <Status message={"saving"}/>
      )}
      {mode === CREATE && (
        <Form onCancel={back} save={save} interviewers={props.interviewers} />
      )}
      
      {/* {props.interview ? useVisualMode(SHOW) : useVisualMode(EMPTY)} */}

      {/* {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )} */}
      {/* {!props.time && <p> No Appointments</p>}
      {props.time && <p> Appointment at {props.time} </p>} */}
    </article>
  );
}
