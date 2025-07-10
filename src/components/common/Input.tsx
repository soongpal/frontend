import type React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    help?: string;
    buttonText: string;
    // onButtonClick: () => void;
}

const Input: React.FC<InputFieldProps> = ({ 
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
    help,
    buttonText,
    // onButtonClick
}) => {

     const hasButton = buttonText;

    return(
        <Form.Group className="mb-5">
            <Form.Label>{label}</Form.Label>
            <InputGroup>
                <Form.Control
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    isInvalid={false} //{!!error}
                />

               {hasButton && (
                <Button variant="outline-secondary">
                    {buttonText}
                </Button>
                )}

                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </InputGroup>
            
            <Form.Text muted>
               {help}
            </Form.Text>
        </Form.Group>
    );
}

export default Input;