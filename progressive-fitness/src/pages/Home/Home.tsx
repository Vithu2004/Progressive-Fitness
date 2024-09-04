import './Home.css'

import { useHistory } from 'react-router';

//Component
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlanCard from '../../components/PlanCard';

interface Home {
    isLogin: (token: string | null) => void
}

interface Plan {
    _id: string;
    name: string;
    description: string;
    typeOfPlan: string;
    duration: string;
    imageUrl: string;
    workouts: string[]; // Vous pouvez ajuster ce type en fonction de vos besoins
}

const Home: React.FC<Home> = ({ isLogin = (token) => { } }) => {
    const history = useHistory;
    const token = localStorage.getItem('token');
    const [plans, setPlans] = useState<Plan[]>([]);

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
        <section className="pf-home">
            <Header />
            <div className="pf-home-plans">
                <h1 className="pf-home-plans-title">Plans</h1>
                <div className="pf-home-plans-plan">
                    {
                        plans.map((plan, index) => (
                            <div key={`plan + ${index}`} className="pf-plan-item">
                                <PlanCard id={plan._id} imageUrl={plan.imageUrl} name={plan.name} typeOfPlan={plan.typeOfPlan} duration={plan.duration} />
                            </div>
                        ))
                    }
                </div>
                <Link to="/plan" className="pf-home-plans-link">View all plan</Link>
            </div>
        </section >
    )
}

export default Home;