import Marque from "./Marque";
import Modele from "./Modele";
import Type from "./Type";

interface MoyenTransport{
    type: Type;
    marque:Marque | null;
    modele: Modele | null;
    transportCommun:  boolean ;
    personnel:  boolean ;
}

export default MoyenTransport;