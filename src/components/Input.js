import React from "react";

const Input = (props) => {
    const {label, error, name, type, defaultValue} = props;
    const formControl = error ? "form-control is-invalid" : "form-control";
    return (
        <div className="form-group my-2">
            <label>{label}</label>
            <input className={formControl} name={name} onChange={props.onChange} type={type} defaultValue={defaultValue} />
            <div className="invalid-feedback">{error}</div>
        </div>
    );
}
export default Input;