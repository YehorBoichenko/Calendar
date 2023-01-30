import React, { useEffect, useState } from "react";
import styles from "./EventForm.module.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import { nanoid } from "nanoid";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { getSelectedDate } from "../../Redux/Selectors/events-selectors";
import svg from "../../assets/icons.svg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function EventForm({
  onClose,
  handlerForm,
  event = null,
  delEvent = null,
}) {
  const selectedDate = useSelector(getSelectedDate);
  const [date, setDate] = useState(
    event ? new Date(event.date) : new Date(selectedDate)
  );
  const [time, setTime] = useState(
    event
      ? new Date(moment(`${event.date} ${event.time}`))
      : new Date(selectedDate)
  );

  useEffect(() => {
    const handlCloseEsc = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handlCloseEsc);
    return () => {
      window.removeEventListener("keydown", handlCloseEsc);
    };
  }, [onClose]);
  const handleOnBackDrop = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    const eventData = {
      title: title.value,
      description: description.value,
      date: moment(date).format("MM/DD/YYYY"),
      time: moment(time).format("HH:mm"),
      id: event ? event.id : nanoid(),
    };
    handlerForm(eventData);
    onClose();
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(50, "Title is too long!")
      .required("Required field!"),
  });

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={handleOnBackDrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.clsBtn} onClick={onClose}>
          <svg className={styles.icon} width="15" height="15">
            <use href={`${svg}#close`}></use>
          </svg>
        </button>
        <Formik
          initialValues={{
            title: event ? event.title : "",
            description: event ? event.description : "",
          }}
          validationSchema={validationSchema}
          validateOnChange
        >
          {({ errors, touched, isValid, handleChange, values }) => {
            return (
              <Form className={styles.form} onSubmit={handlerSubmit}>
                <b className={styles.title}>
                  {event ? `Edit event` : `Add new event`}
                </b>
                {event && (
                  <span className={styles.subtext}>
                    Created at : {event.createdAt}
                  </span>
                )}
                {event?.updatedAt && (
                  <span className={styles.subtext}>
                    Updated at : {event.updatedAt}
                  </span>
                )}
                <label className={styles.label}>
                  Title*
                  <Field
                    type="text"
                    className={styles.input}
                    name="title"
                    onChange={handleChange}
                    autoFocus
                  />
                  {errors.title && touched.title && (
                    <span className={styles.error}>{errors.title}</span>
                  )}
                </label>
                <label className={styles.label}>
                  Description
                  <Field
                    as="textarea"
                    type="text"
                    className={styles.descr}
                    name="description"
                    onChange={handleChange}
                  />
                </label>
                <div className={styles.inputWrap}>
                  <label className={styles.label}>
                    <span className={styles.subtitle}>Date*</span>
                    <DatePicker
                      className={styles.inputDate}
                      selected={date}
                      onChange={(selectedDate) => setDate(selectedDate)}
                      required
                    />
                    {errors.date && touched.date && (
                      <span className={styles.error}>{errors.date}</span>
                    )}
                  </label>
                  <label className={`${styles.label} ${styles.labelTime}`}>
                    <span className={styles.subtitle}>Begin time</span>
                    <svg className={styles.clock} width="15" height="15">
                      <use href={`${svg}#clock`}></use>
                    </svg>
                    <DatePicker
                      selected={time}
                      className={styles.inputTime}
                      onChange={(selectedTime) => setTime(selectedTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                    />
                  </label>
                </div>
                <div className={styles.btnwrap}>
                  {event && (
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => delEvent(event.id)}
                    >
                      <svg className={styles.delete} width="20" height="20">
                        <use href={`${svg}#trash`}></use>
                      </svg>
                    </button>
                  )}
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={!values.title || !date || !isValid}
                  >
                    SAVE
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>,
    document.body
  );
}
