import './Button.css'

interface AuthButton {
    text: String
}

const AuthButton: React.FC<AuthButton> = ({ text }) => {
    return (
        <button className="template-auth-button" type="submit">{text}</button>
    );
}

export default AuthButton;