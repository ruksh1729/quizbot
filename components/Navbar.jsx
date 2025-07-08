import { Link } from "react-router-dom";

const Navbar = () => {
    return (  
        <div className="flex justify-between items-center 
        bg-zinc-900 font-mono font-bold h-10 
        hover:h-12 transition-all rounded-br-3xl">
            <div className="text-left">
                <Link className="text-teal-400 text-2xl pl-4 
                hover:text-amber-200 hover:text-3xl 
                hover:pl-5 transition-all ">QuizBot</Link>
            </div>
            <div className="text-right">
                <Link className="text-right text-teal-400 text-2xl pr-4 
                hover:text-amber-200 hover:text-3xl 
                hover:pr-5 transition-all ">Login</Link>
            </div>
        </div>
    );
}
 
export default Navbar;