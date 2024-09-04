import './Header.css'

import LogoIcon from '../assets/Logo-icon.png';


const Header: React.FC = () => {
    return (
        <header className='template-app-header'>
            <img className="template-app-header-logo" src={LogoIcon} alt="Logo de Template App" />
        </header>
    );
}

export default Header;