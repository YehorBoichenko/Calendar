import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Cell.module.css";
import EventForm from "../../EventForm/EventForm";
import { deleteEvent, editEvent } from "../../../Redux/Slicers/events-slicer";
import moment from "moment/moment";

const colors = [
  "#9B56DB",
  "#f1b211",
  "#784FE1",
  "#5346D7",
  "#186cb8",
  "#2a9a9f",
  "#e83611",
  "#f9002f",
  "#9337E9",
  "#A274CD",
];

export default function Cell({ event, i }) {
  const [modalEventEdit, setModalEventEdit] = useState(false);

  const dispatch = useDispatch();

  const openModalForm = () => {
    setModalEventEdit(true);
  };
  const closeModalForm = () => {
    setModalEventEdit(false);
  };

  const handkSubmitForm = (data) => {
    data.updatedAt = moment().format("D.M.YYYY HH:mm");
    dispatch(editEvent(data));
  };

  const delEvent = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <>
      {modalEventEdit && (
        <EventForm
          onClose={closeModalForm}
          handlerForm={handkSubmitForm}
          event={event}
          delEvent={delEvent}
        />
      )}

      <li
        style={{
          backgroundColor: `${colors[i]}`,
        }}
        className={styles.cell}
        onClick={openModalForm}
      >
        <span> {event.title}</span>
        <span>{event.time}</span>
      </li>
    </>
  );
}
