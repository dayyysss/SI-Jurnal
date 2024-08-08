import React from 'react';

const InputText = ({ type, value, onChange, name, containerStyle, labelTitle }) => {
    return (
        <div className={`form-control ${containerStyle}`}>
            <label className="label">
                <span className="label-text">{labelTitle}</span>
            </label>
            <input
                type={type || "text"}
                name={name} // Use name attribute to match state key
                value={value}
                onChange={onChange} // Call the parent handler
                className="input input-bordered"
            />
        </div>
    );
};

export default InputText;
