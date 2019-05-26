import React from "react";

export default function ValidationErrors(props) {
  if (props.hasError) {
    return (
      <div className="error" id="validationError">
        {props.message}
      </div>
    );
  }
  return <></>;
}