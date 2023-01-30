import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { updateDate } from "../../redux/slicers/events-slicer";
import { getSelectedDate } from "../../redux/selectors/events-selectors";
import styles from "./Datepicker.module.css";
import moment from "moment/moment";
import svg from "../../assets/icons.svg";

export default function DatePickerSection() {
  const currentDate = useSelector(getSelectedDate);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!currentDate) {
      return;
    }

    setSelectedDate(new Date(currentDate));
  }, [currentDate]);

  const setDateToStore = (date) => {
    dispatch(updateDate(moment(date).format("MM/DD/YYYY")));
  };
  const nextMonth = () => {
    dispatch(
      updateDate(moment(selectedDate).add(1, "month").format("MM/DD/YYYY"))
    );
  };
  const prevMonth = () => {
    dispatch(
      updateDate(moment(selectedDate).subtract(1, "month").format("MM/DD/YYYY"))
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.month}>
        <button type="button" className={styles.btn} onClick={prevMonth}>
          <svg className={styles.iconArrow} width="15" height="15">
            <use href={`${svg}#arrow-back`}></use>
          </svg>
        </button>
        <p className={styles.monthText}>
          {selectedDate
            ? moment(selectedDate).format("MMMM")
            : moment(new Date()).format("MMMM")}
        </p>
        <button type="button" className={styles.btn} onClick={nextMonth}>
          <svg className={styles.iconArrow} width="15" height="15">
            <use href={`${svg}#arrow-forward`}></use>
          </svg>
        </button>
      </div>
      <div className={styles.calendarBox}>
        <svg className={styles.iconCalendar} width="15" height="10">
          <use href={`${svg}#calendar`}></use>
        </svg>
        <DatePicker
          selected={selectedDate ? selectedDate : new Date()}
          className={styles.datePicker}
          onChange={setDateToStore}
          placeholderText={""}
          showYearDropdown
          scrollableYearDropdown
        />
      </div>
    </div>
  );
}
