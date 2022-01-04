import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerData = props.interviewers;
  //console.log(interviewerData)
  const interviewerList = interviewerData.map((data) => (
    //console.log(data)
    <InterviewerListItem
      key={data.id}
      avatar={data.avatar}
      name={data.name}
      selected={props.value === data.id}
      setInterviewer={() => props.onChange(data.id)}
    />
  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}
