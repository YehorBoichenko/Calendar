import styles from "./AddEventBtn.module.css";
import svg from "../../assets/icons.svg";

export default function AddEventBtn({ handler, goToday }) {
  return (
    <>
      <button type="button" className={styles.btn} onClick={handler}>
        <svg className={styles.icon} width="15" height="15">
          <use href={`${svg}#add`}></use>
        </svg>
      </button>
      <button type="button" className={styles.gotoday} onClick={goToday}>
        Today
      </button>
    </>
  );
}
