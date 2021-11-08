import IPage from "../interfaces/page";
import {useSelector} from "react-redux";
import {State} from "../state";
import DisplayTags from "../components/DisplayTags";
//import getHeisigTrad from "./tradHeisig";

const Products: React.FunctionComponent<IPage> = props => {

    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )

    return (
    <section>
        <h1> The Products page </h1>
        <DisplayTags data={characterSRSstate}/>
    </section>
    );

};

export default Products;