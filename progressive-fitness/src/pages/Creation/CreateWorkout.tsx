import './Create.css';

import { useHistory } from "react-router";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from 'react';

interface CreateWorkout {
    isLogin: (token: string | null) => void
}

const CreateWorkout: React.FC<CreateWorkout> = ({ isLogin = (token) => { } }) => {
    const history = useHistory();
    const token = localStorage.getItem('token');

    isLogin(token);

    const [inputFields, setInputFields] = useState<string[]>(['']);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //On récupere les données
        const formData = new FormData(e.currentTarget);
        const formName = formData.get('Name');
        const formDuration = formData.get('Duration');

        //On vérifie si otute est remplie
        if (formName === "" || formDuration === "")
            throw new Error("Veuillez remplir tout les champs");


        //On prépare le headers de la requete 
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append('Content-Type', "application/json");

        //On fais la requetes au serveur
        fetch('http://localhost:3000/api/workout/createWorkout', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(
                {
                    workout: {
                        name: formName,
                        duration: formDuration,
                        exos: inputFields
                    }
                })
        })
            .then(response => response.text())
            .then(responseJson => console.log(responseJson))
            .catch(error => console.log("erreur : " + error));

        //history.push('/');
    }

    return (
        <section className='pf-create workout'>
            <Header />
            <form className='pf-create-form workout' onSubmit={handleSubmit}>
                <Input name="Name" type="text" />
                <Input name="Duration" type="number" />
                {inputFields.map((input, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={input}
                            onChange={(event) => handleInputChange(index, event)}
                            placeholder={`Exo ${index + 1}`}
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

export default CreateWorkout;