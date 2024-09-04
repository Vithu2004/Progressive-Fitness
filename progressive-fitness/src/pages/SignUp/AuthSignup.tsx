import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as emailValidator from 'email-validator';

import './AuthSignup.css'

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import AuthIcon from '../../assets/Auth-icon.png'

const AuthSignup: React.FC = () => {
    const [isEmailValid, setEmailValid] = useState(true);
    const [strongPassword, setStrongPassword] = useState(false);
    const [isFormFull, setFormFull] = useState(true);
    const history = useHistory();

    //Fonction qui permet de vérifier si le mot de passe est puissant, est appellé dans handleSubmit
    const isStrongPassword = (password: string): boolean => {
        // Vérification de la longueur minimale
        if (password.length < 6) {
            return false;
        }

        // Vérification de la présence de majuscules, de chiffres et de caractères spéciaux
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]+$/;
        return regex.test(password);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //On récupere les données
        const formData = new FormData(e.currentTarget);
        const lastname = formData.get('Nom');
        const firstname = formData.get('Prenom');
        const email = formData.get('Email');
        const password = formData.get('Mot de passe');

        //On remet les states à leur état de base.
        setEmailValid(true);
        setStrongPassword(false);
        setFormFull(true);

        //On vérifie si tout les champs sont remplie
        if (lastname !== "" && firstname !== "" && email !== "" && password !== ""
            && email !== null && password !== null) {
            //On vérifie si l'email est correcte
            if (!emailValidator.validate(email.toString())) {
                //Renvoie une erreur si c'est pas le cas
                setEmailValid(false);
                throw new Error('Veuillez taper un email valide');
            }
            else {
                if (isStrongPassword(password.toString()) === false) {
                    setStrongPassword(true);
                    throw new Error('Veuillez taper un mot de passe qui contient 6 caractéres, au moins une majuscules, des chiffres et au moins un caractères spéciaux')
                }
            }
        }
        else {
            setFormFull(false);
            throw new Error('Veuillez remplir tout les champs');
        }
        setEmailValid(true);
        setStrongPassword(false);
        setFormFull(true);

        //On post les données dans le serveur si tout les conditions sont remplie
        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    currentPlan: " "
                })
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la soumission du formulaire');
            }

            //On récupere le token pour les futurs requetes 
            const responseData = await response.json();
            console.log(responseData);
            //On stocke le token dans le localstorage pour le récuperer plus tard
            localStorage.setItem('token', responseData.token);
            //On redirige vers la page principale
            history.push('/');

        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <section className='template-signup'>
            <Header />
            <div className='template-signup-title'>
                <h1 className='template-signup-title-title'>
                    S'inscrire
                </h1>
                <img className='template-signup-title-auth' src={AuthIcon} alt="Icon d'authentification" />
            </div>
            <form className='template-signup-form' onSubmit={handleSubmit}>
                <Input name="Nom" type='text' />
                <Input name="Prenom" type='text' />
                <Input name="Email" type="email" />
                <Input name="Mot de passe" type="password" />
                {
                    strongPassword === true ?
                        <div className='template-signup-error'>Les mots de passe doivent contenir au moins 6 caractères et comprendre des lettres, des chiffres et des symboles.</div>
                        : null
                }
                {
                    isEmailValid === false ?
                        <div className='template-signup-error'>Veuillez à bien taper un email valide.</div>
                        : null
                }
                {
                    isFormFull === false ?
                        <div className='template-signup-error'>Veuillez à bien remplir tout les champs.</div>
                        : null
                }
                <Button text="S'inscrire" />
            </form>
            <Link to="/login" className='template-signup-login'>Se connecter</Link>
        </section>
    );
}

export default AuthSignup;