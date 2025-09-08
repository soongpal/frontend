import {BarLoader} from "react-spinners";

const Loading = () =>{
    return(
        <div>
            <h3>잠시만 기다려주세요.</h3>
            <BarLoader color="var(--soongpal-color)"/>
        </div>
    )
}

export default Loading;