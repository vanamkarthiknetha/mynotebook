import React from "react";

const Capitalize = (str) => {
  if (str === "danger") str = "error";
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export default function Alert(props) {
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{Capitalize(props.alert.type)}</strong> : {props.alert.message}
      </div>
    )
  );
}
