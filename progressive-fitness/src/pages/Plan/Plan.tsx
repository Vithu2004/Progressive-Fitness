import './Plan.css'

import { useHistory } from 'react-router';

//Component
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlanCard from '../../components/PlanCard';

interface Plan {
    isLogin: (token: string | null) => void
}

interface PlanData {
    _id: string;
    name: string;
    description: string;
    typeOfPlan: string;
    duration: string;
    imageUrl: string;
    workouts: string[]; // Vous pouvez ajuster ce type en fonction de vos besoins
}

const Plan: React.FC<Plan> = ({ isLogin = (token) => { } }) => {
    const history = useHistory;
    const token = localStorage.getItem('token');
    const [plans, setPlans] = useState<PlanData[]>([]);

    isLogin(token);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    useEffect(() => {
        fetch("http://localhost:3000/api/plan/", requestOptions)
            .then((response) => response.json())
            .then((result) => setPlans(result))
            .catch((error) => console.error(error));
    }, []);

    return (
        <section className="pf-plans">
            <Header />
            <h1 className="pf-plans-title">Plans</h1>
            <div className="pf-plans-list">
                {
                    plans.map((plan, index) => (
                        <div key={`plan + ${index}`} className="pf-plan-item">
                            <PlanCard id={plan._id} imageUrl={plan.imageUrl} name={plan.name} typeOfPlan={plan.typeOfPlan} duration={plan.duration} />
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Plan