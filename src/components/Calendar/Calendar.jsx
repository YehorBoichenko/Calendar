import React from "react";

import Item from "./Item/Item";
import moment from "moment";
import styles from "./Calendar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedDate } from "../../redux/selectors/events-selectors";
import { updateDate } from "../../redux/slicers/events-slicer";

export default function Calendar() {
  const selectedDate = useSelector(getSelectedDate);
  const dispatch = useDispatch();
  moment.updateLocale("en", { week: { dow: 1, doy: 7 } });

  const startDay = moment(selectedDate ? new Date(selectedDate) : new Date())
    .startOf("month")
    .startOf("week");

  const endDay = moment(selectedDate ? new Date(selectedDate) : new Date())
    .endOf("month")
    .endOf("week");

  const calendar = [];
  const day = startDay.clone();

  while (!day.isAfter(endDay)) {
    calendar.push(day.clone());
    day.add(1, "day");
  }
  const setDateToStore = (date) => {
    dispatch(updateDate(moment(date).format("MM/DD/YYYY")));
  };

  return (
    <ul className={styles.list}>
      {calendar.map((item, i) => {
        return (
          <Item
            key={i}
            date={item}
            isToday={moment().format("L") === item.format("L")}
            isSelected={
              moment(new Date(selectedDate)).format("L") === item.format("L")
            }
            handlerDate={setDateToStore}
          />
        );
      })}
    </ul>
  );
}
