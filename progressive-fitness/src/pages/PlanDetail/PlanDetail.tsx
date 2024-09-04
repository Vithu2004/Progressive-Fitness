import "./PlanDetail.css"

import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

interface ExoData {
    _id: string,
    name: string,
    video: string
}

interface WorkoutData {
    _id: string,
    name: string,
    duration: string,
    exosDetail: ExoData[]
}

interface PlanData {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    typeOfPlan: string;
    duration: string;
    workoutDetails: WorkoutData[];
}

interface PlanDetail {
    isLogin: (token: string | null) => void
}

const PlanDetail: React.FC<PlanDetail> = ({ isLogin = (token) => { } }) => {
    const token = localStorage.getItem('token');

    isLogin(token);

    const { id } = useParams<{ id: string }>();
    const [plan, setPlan] = useState<PlanData | null>(null);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    useEffect(() => {

        fetch(`http://localhost:3000/api/plan/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => setPlan(result))
            .catch((error) => console.error(error))
    }, []);


    return (
        <section className="pf-planDetail">
            <Header />
            {
                plan !== null ?
                    <div className="pf-planDetail-plan" style={{ background: `url(${plan.imageUrl})` }}>
                        <h2 className="pf-planDetail-title">{plan.name}</h2>
                        <p className="pf-planDetail-type">{plan.typeOfPlan}</p>
                        <p className="pf-planDetail-duration">{plan.duration}</p>
                    </div>
                    : null
            }
            <div className="pf-planDetail-workouts">
                {
                    plan !== null && plan.workoutDetails.map((workout, index) => (
                        <div className="pf-planDetail-workout-item" key={`Workout-${index}`}>
                            <h3 className="pf-planDetail-workout-item-title">{workout.name}</h3>
                            {
                                workout.exosDetail.map((exo, index) => (
                                    <div className="pf-planDetail-workout-item-exo" key={`Exo-${index}`}>{exo.name}</div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default PlanDetail;