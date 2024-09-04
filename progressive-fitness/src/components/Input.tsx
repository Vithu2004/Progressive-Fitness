import './Input.css';

interface Input {
    name: string,
    type: string,
}

const Input: React.FC<Input> = ({ name, type }) => {
    return (
        <input className="template-app-input" type={type} placeholder={name} name={name} />
    );
}

export default Input;