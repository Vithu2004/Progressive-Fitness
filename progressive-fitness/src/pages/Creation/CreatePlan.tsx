import './Create.css';

import { useHistory } from "react-router";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from 'react';
import React, { ChangeEvent } from 'react';


interface CreatePlan {
    isLogin: (token: string | null) => void
}

const CreatePlan: React.FC<CreatePlan> = ({ isLogin = (token) => { } }) => {
    const history = useHistory();
    const token = localStorage.getItem('token');

    isLogin(token);

    const [inputFields, setInputFields] = useState<string[]>(['']);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        // Vérifier que des fichiers ont été sélectionnés avant d'accéder au premier
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    // Fonction pour gérer les changements dans les champs
    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const values = [...inputFields];
        values[index] = event.target.value;
        setInputFields(values);
    };

    // Fonction pour ajouter un nouveau champ d'entrée
    const handleAddField = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setInputFields([...inputFields, '']);
    };

    // Fonction pour supprimer un champ d'entrée
    const handleRemoveField = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //On récupere les données
        const formData = new FormData(e.currentTarget);
        const formName = formData.get('Name of Plan');
        const formDescription = formData.get('Description');
        const formTypePlan = formData.get("Type of plan");
        const formDuration = formData.get("Duration");
        //On vérifie si tout les champs sont remplie
        if (formName === "" || formDescription === "" || formTypePlan === "")
            throw new Error("Veuillez remplir tout les champs");

        const formData2 = new FormData();

        const planData = {
            name: formName,
            description: formDescription,
            typeOfPlan: formTypePlan,
            duration: formDuration,
            workouts: inputFields
        }
        console.log(formData2);

        if (imageFile)
            formData2.append('image', imageFile);

        formData2.append('plandata', JSON.stringify(planData));
        //On prépare le headers de la requete 
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        //On fais la requetes au serveur
        fetch('http://localhost:3000/api/plan/createPlan', {
            method: 'POST',
            headers: myHeaders,
            body: formData2
        })
            .then(response => response.text())
            .then(responseJson => console.log(responseJson))
            .catch(error => console.log("erreur : " + error));
    }

    return (
        <section className="pf-create plan">
            <form className='pf-create-form plan' onSubmit={handleSubmit}>
                <Input name="Name of Plan" type="text" />
                <Input name="Description" type="text" />
                <Input name="Type of plan" type="text" />
                <Input name="Duration" type="text" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {inputFields.map((input, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={input}
                            onChange={(event) => handleInputChange(index, event)}
                            placeholder={`Day ${index + 1}`}
                        />
                        <button onClick={(event) => handleRemoveField(index, event)}>Remove</button>
                    </div>
                ))}
                <button onClick={handleAddField}>Add Input</button>
                <Button text="Créer" />
            </form>
        </section>
    )
}

export default CreatePlan;