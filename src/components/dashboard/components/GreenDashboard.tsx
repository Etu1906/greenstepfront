import { Progress } from "./Progress";

export const GreenDashboard : React.FC = () =>{
    return (
        <>
            <div className="inner-dashboard">
            <Progress old_value={20} actual_value={15} type={1}></Progress>
            </div>
        </>
    );
}