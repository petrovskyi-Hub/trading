import { useState, createRef } from "react";
import Papa from "papaparse";
import PropTypes from "prop-types";
import s from "./FileInput.module.css";

export default function FileInput({ setData, setError, setTitle }) {
  const fileInput = createRef();
  const [isUploaded, setIsUploaded] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setError("");

    if (fileInput?.current?.files[0]) {
      setTitle(fileInput?.current?.files[0].name);
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
    <>
      <form className={s.fileInputForm} onChange={handleChange}>
        <label className={s.fileInputLabel} htmlFor="file-input">
          Import csv file
        </label>
        <input className={s.fileInput} type="file" id="file-input" ref={fileInput} />
      </form>
      {isUploaded && <p style={{ color: "green", marginTop: "0px" }}>File uploaded</p>}
    </>
  );
}

FileInput.propTypes = {
  setData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
