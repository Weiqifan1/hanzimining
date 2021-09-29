import IPage from "../interfaces/page";

import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { actionCreators, State } from '../state/index';//from '../state/index';//'./state/index'

const Insurance : React.FunctionComponent<IPage> = props => {

    const dispatch = useDispatch();
    const {
        depositMoney,
        withdrawMoney,
        bankrupt
    } = bindActionCreators(actionCreators, dispatch)
    const amount = useSelector(
        (state: State) => state.bank)


    return <div>
        <h1> The Insurance page </h1>
        <h1>{amount}</h1>
        <button onClick={() => depositMoney(1000)}>Deposit</button>
        <button onClick={() => withdrawMoney(500)}>Withdraw</button>
        <button onClick={() => bankrupt()}>Bankrupt</button></div>

};

export default Insurance;