import type React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    help?: string;
    buttonText?: string;
    // onButtonClick: () => void;
    as?:React.ElementType
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
    as,
    
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
                    as={as}
                />

               {hasButton && ( //input옆에 붙은 버튼(ex 중복확인)
                <Button variant="outline-secondary">
                    {buttonText}
                </Button>
                )}

                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </InputGroup>
            
            <Form.Text muted> {/*아래쪽에 있는 조건 문구 */}
               {help}
            </Form.Text>
        </Form.Group>
    );
}

export default Input;