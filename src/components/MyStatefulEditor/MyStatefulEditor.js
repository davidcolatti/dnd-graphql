import React, { useState, useEffect } from "react";
import RichTextEditor from "react-rte";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { EDIT_CONTACT } from "../../api/mutations";
import "./mystatefuleditor.scss";

const MyStatefulEditor = ({ onChange }) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [fields, setFields] = useState({});
  const [userId, setUserId] = useState(null);
  const [editContact] = useMutation(EDIT_CONTACT);

  const location = useLocation();

  useEffect(() => {
    let id = location.pathname.split("/")[1];

    if (id) {
      setUserId(id);
    }
  }, [location]);

  function handleChange(value) {
    let html = value.toString("html");
    let parsed = html.match(/[^<.*>]\w.*:[\w\d\s]*/gm);

    let data = {};
    if (parsed)
      parsed.forEach((each) => {
        let type = each.split(":")[0].trim().toLowerCase();
        let value = each.split(":")[1].trim();

        data[type] = value;
      });

    setFields(data);
    setValue(value);

    if (onChange) {
      onChange(html);
    }
  }

  function handleSaveBtn() {
    if (fields) {
      editContact({ variables: { id: userId, ...fields } });
    }
  }

  function handleCancelBtn() {
    setFields({});
    window.history.back();
  }

  return (
    <div className="modal">
      <RichTextEditor value={value} onChange={handleChange} />
      <br />
      <br />
      <span className="modalBottom">
        <button className="save button" onClick={handleSaveBtn}>
          Save
        </button>
        <button className="cancel button" onClick={handleCancelBtn}>
          Cancel
        </button>
      </span>
    </div>
  );
};

MyStatefulEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default MyStatefulEditor;
