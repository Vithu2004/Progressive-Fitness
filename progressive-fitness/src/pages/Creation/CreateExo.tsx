import './Create.css';

import { useHistory } from "react-router";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";

interface CreateExo {
    isLogin: (token: string | null) => void
}

const CreateExo: React.FC<CreateExo> = ({ isLogin = (token) => { } }) => {
    const history = useHistory();
    const token = localStorage.getItem('token');

    isLogin(token);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //On récupere les données
        const formData = new FormData(e.currentTarget);
        const formName = formData.get('Name');
        const formVideo = formData.get('Video');

        //On vérifie si otute est remplie
        if (formName === "" || formVideo === "")
            throw new Error("Veuillez remplir tout les champs");

        //On prépare le headers de la requete 
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append('Content-Type', "application/json");

        //On fais la requetes au serveur
        fetch('http://localhost:3000/api/exo/', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(
                {
                    exo: {
                        name: formName,
                        video: formVideo
                    }
                })
        })
            .then(response => response.text())
            .then(responseJson => console.log(responseJson))
            .catch(error => console.log("erreur : " + error));

        //history.push('/');
    }

    return (
        <section className="pf-create Exo">
            <Header />
            <form className="pf-create-form Exo" onSubmit={handleSubmit}>
                <Input name="Name" type="text" />
                <Input name="Video" type="text" />
                <Button text="Créer l'exercice" />
            </form>
        </section>
    )
}


export default CreateExo;