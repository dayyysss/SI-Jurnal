import { useState } from "react";

function InputText({ labelTitle, labelStyle, type, containerStyle, value, onChange, updateType }) {
    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={`label-text text-base-content ${labelStyle}`}>{labelTitle}</span>
            </label>
            <input
                type={type || "text"}
                value={value}
                onChange={(e) => onChange(e)}
                placeholder=""
                className="input input-bordered w-full"
            />
        </div>
    );
}

export default InputText;
