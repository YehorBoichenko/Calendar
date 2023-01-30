import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent, updateDate } from "../../Redux/Slicers/events-slicer";
import AddEventbtn from "../AddEventBtn/AddEventBtn";
import Datepicker from "../Datepicker/Datepicker";
import EventForm from "../EventForm/EventForm";
import moment from "moment/moment";
import styles from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const addSubmit = (data) => {
    data.createdAt = moment().format("D.M.YYYY HH:mm");
    dispatch(addEvent(data));
  };
  const goTodayhandler = () => {
    dispatch(updateDate(moment().format("MM/DD/YYYY")));
  };
  return (
    <header className={styles.header}>
      <AddEventbtn handler={handleOpen} goToday={goTodayhandler} />
      {modalIsOpen && (
        <EventForm onClose={handleClose} handlerForm={addSubmit} />
      )}
      <Datepicker />
    </header>
  );
}
