import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Status from "components/Appointment/Status";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM_DELETE = "CONFIRM_DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    props.bookInterview(props.id, interview)
      .then((response) => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE)
        console.log(error);
      });
  }

  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING)
    props.cancelInterview(props.id, interview)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE)
        console.log(err);
      });
  }
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onDelete={() => transition(CONFIRM_DELETE)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CREATE && (
        <Form onCancel={back} save={save} interviewers={props.interviewers} />
      )}
      {mode === EDIT && (
        <Form onCancel={back} save={save} student={props.student} interviewers={props.interviewers} />
      )}
      {mode === CONFIRM_DELETE && <Confirm message={"Delete this appointment?"} onCancel={() => back()} onConfirm={() => cancel(props.student, props.interviewer)} />}
      {mode === ERROR_DELETE && <Error message={"could not delete"} onClose={() => transition(SHOW, true)}/>}
      {mode === ERROR_SAVE && <Error message={"could not save"} onClose={() => transition(EMPTY, true)}/>}

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
