import { useHistory } from "react-router"
import "./PlanCard.css"
import { MouseEventHandler } from "react";

interface PlanCard {
    id: string,
    imageUrl: string,
    name: string,
    typeOfPlan: string,
    duration: string
}

const PlanCard: React.FC<PlanCard> = ({ id, imageUrl, name, typeOfPlan, duration }) => {
    const history = useHistory();

    const handleClick = () => {
        console.log(id);
        history.push(`/plan/${id}`);
    }

    return (
        <div className="pf-plan" style={{ background: `url(${imageUrl})` }} onClick={handleClick}>
            <h2 className="pf-plan-title">{name}</h2>
            <p className="pf-plan-type">{typeOfPlan}</p>
            <p className="pf-plan-duration">{duration}</p>
        </div>
    )
}

export default PlanCard;