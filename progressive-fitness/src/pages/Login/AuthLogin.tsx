import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./AuthLogin.css"

import AuthIcon from '../../assets/Auth-icon.png'

import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';

const AuthLogin: React.FC = () => {
    const [isFormFull, setFormFull] = useState(true);
    const [isAccountValid, setAccountValid] = useState(true);
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //On récupere les données
        const formData = new FormData(e.currentTarget);
        const email = formData.get('Email');
        const password = formData.get('Mot de passe');

        //On remet les states à leur état de base.
        setFormFull(true);
        setAccountValid(true);

        //On vérifie si le formulaire a tout les champs remplie
        if (email === "" || password === "") {
            setFormFull(false);
            throw new Error('Veuillez remplir tout les champs');
        }

        //On fais la requete au serveur
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            if (!response.ok) {
                setAccountValid(false);
                throw new Error('Erreur lors de la soumission du formulaire');
            }

            //On récupere le token pour les futurs requetes 
            const responseData = await response.json();
            //On stocke le token dans le localstorage pour le récuperer plus tard
            localStorage.setItem('token', responseData.token);
            //On redirige vers la page principale
            history.push('/')

        } catch (error) {
            console.error('Erreur:', error);
        }
    };


    return (
        <section className='template-login'>
            <Header />
            <div className='template-login-title'>
                <h1 className='template-login-title-title'>
                    Se connecter
                </h1>
                <img className='template-login-title-auth' src={AuthIcon} alt="Icon d'authentification" />
            </div>
            <form className='template-login-form' onSubmit={handleSubmit}>
                <Input name="Email" type="email" />
                <Input name="Mot de passe" type="password" />
                {
                    isFormFull === false ?
                        <div className='template-signup-error'>Veuillez à bien remplir tout les champs.</div>
                        : null
                }
                {
                    isAccountValid === false ?
                        <div className='template-signup-error'>Paire Email / Mot de passe incorrect.</div>
                        : null
                }
                <a className='template-login-forgotPassword' href="#">Mot de passe oublié ?</a>
                <Button text="Se connecter" />
            </form>
            <Link to="/signup" className='template-login-createAccount'>Créer un compte</Link>
        </section>
    );
}

export default AuthLogin;