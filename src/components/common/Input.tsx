import type React from "react";
import { Form,FloatingLabel } from "react-bootstrap";

const inputStyle: React.CSSProperties = {

};

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;

}

const Input: React.FC<InputFieldProps> = ({ label, type, name, error, placeholder }) => {

    return(
        <Form.Group className="mb-5">
            <FloatingLabel
                controlId={name}
                label={label}
            >
                <Form.Control
                    type={type}
                    name={name}
                    // value={value}
                    // onChange={onChange}
                    placeholder={placeholder}
                    // isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    );
}

export default Input;