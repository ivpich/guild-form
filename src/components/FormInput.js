import React from 'react';

const FormInput = ({ type, name, label, value, handleChange }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    required
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    required
                />
            )}
        </div>
    );
};

export default FormInput;
