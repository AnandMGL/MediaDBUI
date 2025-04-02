import React from "react";
import "./simple-checkbox.scss";

export default function SimpleCheckbox({
  id = "simple-checkbox",
  onChange,
  checked,
  label = "",
}) {
  return (
    <label htmlFor="simple-checkbox" className="simple-checkbox">
      <input
        name="myCheckbox"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
