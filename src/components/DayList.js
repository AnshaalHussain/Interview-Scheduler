import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const arrayData = props.days;
  const dayList = arrayData.map((data) => (
    <DayListItem
      key={data.id}
      name={data.name}
      spots={data.spots}
      selected={data.name === props.value}
      setDay={props.onChange}
      
    />
 
  ));

  return <ul>{dayList}</ul>;
}
