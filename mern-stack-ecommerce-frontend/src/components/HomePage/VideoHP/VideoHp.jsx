import VideoPaha from "./GucciSummer.mp4";
import { Animated } from "react-animated-css";



export default function VideoHp() {
    return (
        <div className="my-20" >
            {/* <h1 className="">Introduction about My web site</h1> */}
            {/* <Animated className="text-4xl text-center uppercase" animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                
            </Animated> */}
            <video className=" mx-auto mt-10 lg:h-4/6  lg:w-4/6 px-30 rounded-3xl" controls autoPlay muted >
                <source src={VideoPaha} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}