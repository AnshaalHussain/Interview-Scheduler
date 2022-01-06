import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  let arrayData = props.days;
  let newArray = []
  for(let item in arrayData) {
    newArray.push(arrayData[item])
  }

  console.log("srrayData", newArray);
  const dayList = newArray.map((data) => (
    <DayListItem
      key={data.id}
      name={data.name}
      spots={data.spots}
      selected={data.name === props.value}
      setDay={props.setDay}
    />
  ));

  return <ul>{dayList}</ul>;
}
