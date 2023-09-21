import ClockImage from "./ClockImage";
import ClockTime from "./ClockTime";
import MyCom from "../03/MyCom";
const Clock = () => {

    return (
        <div className="App">
            <header className="App-header">
                <ClockImage/>
                <ClockTime/>
            </header>
        </div>
    );
}

export default Clock;