import { useState, createRef } from "react";
import Papa from "papaparse";
import PropTypes from "prop-types";
import s from "./FileInput.module.css";

export default function FileInput({ setData, setError, setTitle }) {
  const fileInput = createRef();
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setError("");

    if (fileInput?.current?.files[0]) {
      setTitle(fileInput?.current?.files[0].name);
      setFileName(fileInput?.current?.files[0].name);
      Papa.parse(fileInput?.current?.files[0], {
        complete: function (results) {
          if (results.errors.length) {
            setError(results.errors[0].message);
          }

          setIsUploaded(true);
          setData(results.data);
        },
      });
    }
  };

  return (
    <div>
      <form className={s.fileInputForm} onChange={handleChange}>
        <label className={s.fileInputLabel}>
          Import csv file
          <input className={s.fileInput} type="file" ref={fileInput} />
        </label>
      </form>
      {isUploaded && (
        <p style={{ color: "green", marginTop: "0px", display: "inline-block" }}>Загружен файл {fileName}</p>
      )}
    </div>
  );
}

FileInput.propTypes = {
  setData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
