import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBack, shareSocial } from 'ionicons/icons';
import IconButton from '@mui/material/IconButton';
export const DashboardHead: React.FC = () =>{
    return (
        <>
            <div className="dashboard-head">
                <div className="my-button">
                    <IconButton  aria-label="back" size="small">
                        <IonIcon slot="icon-only" size="small" icon={arrowBack} />
                    </IconButton>
                </div>

                <span>Mon tableau de bord</span>
                <div className="my-button">
                    <IconButton aria-label="share" size="small">
                        <IonIcon slot="icon-only"  size="small" icon={shareSocial} />
                    </IconButton>
                </div>
                
            </div>
        </>
    );
}