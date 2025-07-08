import { use, useState } from "react";
import { URL } from "../src/constants";
import Output from "./Output";
import { data } from "react-router-dom";

const Home = () => {

    const [topic, setTopic]=useState('');
    const [topicHead, setTopichead]=useState(true);
    const [number, setNumber]=useState('');
    const [numberHead,setNumberhead]=useState(false);
    const [timer, setTimer]=useState('');
    const [timerHead, setTimerhead]=useState(false);
    const [finalHead, setFinalhead]=useState(false);
    const [t,setT]=useState(0);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [bgcolor, setBgcolor] = useState('bg-zinc-900');
    const [isPending, setPending] = useState(false);
    const [generating, setGenerating] = useState('Generating Quiz...')

    const handleChange=(event)=>{
        if(event.key==='Enter'){
            handleInput();
        }
    }

    const handleInput=()=>{
        if(topic==''){
            setTopic(input);
            setInput('');
            setTopichead(false);
            setNumberhead(true);
            setTimerhead(false);
            setFinalhead(false);
        }else if(number==''){
            setNumber(input);
            setInput('');
            setTopichead(false);
            setNumberhead(false);
            setTimerhead(true);
            setFinalhead(false);
        }else{
            setTimer(input);
            setT(Number(timer)*60);
            setInput('');
            setTopichead(false);
            setNumberhead(false);
            setTimerhead(false);
            setFinalhead(true);
        }
        if(topic!='' && number!='' && timer!=''){
            const Prompt=`Generate exactly ${number} multiple-choice questions about the topic of ${topic}. Each question must have exactly 4 options. The entire content for each question (question, options, and correct answer) must be exactly 6 lines long. Do not include any header or footer text in your response.
                        Here is the required format for each question:
                        Line 1: The question text.
                        Line 2: A) Option 1
                        Line 3: B) Option 2
                        Line 4: C) Option 3
                        Line 5: D) Option 4
                        Line 6: Correct Answer: [The Entire text of the correct option, e.g. option 3]`
            askQuestion(Prompt);
        }
    }

    const askQuestion=async(Prompt)=>{
        setFinalhead(false);
        setPending(true);
        const payload = {
        "contents": [{
            "parts": [{"text": Prompt}]
        }]
    }
        let response = await fetch(URL,{
        method:"POST",
        body:JSON.stringify(payload)
        })
        response = await response.json();
        let datastring = response.candidates[0].content.parts[0].text;
        console.log(datastring);
        setOutput(datastring);
        setFinalhead(false);
        setGenerating('Generating Quiz');
        setPending(false);
   }

    return (  
        <div className=" bg-zinc-900 h-173">
            <div className={`grid grid-rows-10 ${bgcolor} transition-colors font-mono`}>
                <div className={`row-span-9 container h-155 overflow-y-auto overflow-x-hidden scrollbar-black ${bgcolor} transition-colors justify-center flex`}>
                    {topicHead && <h1 className="mt-25 text-center text-5xl bg-gradient-to-r w-200 from-teal-400 via-cyan-100 to-amber-200 block text-transparent bg-clip-text">Enter the topic of Quiz</h1>}
                    {numberHead && <h1 className="mt-25 text-center text-5xl bg-gradient-to-r w-200 from-teal-400 via-cyan-100 to-amber-200 block text-transparent bg-clip-text">Enter the number of questions</h1>}
                    {timerHead && <h1 className="mt-25 text-center text-5xl bg-gradient-to-r w-200 from-teal-400 via-cyan-100 to-amber-200 block text-transparent bg-clip-text">Enter the duration of Quiz</h1>}
                    {finalHead && <h1 className="mt-25 text-center text-5xl bg-gradient-to-r w-200 from-teal-400 via-cyan-100 to-amber-200 block text-transparent bg-clip-text">Press enter to start the Quiz</h1>}
                    {isPending && <h1 className="mt-25 text-center text-5xl bg-gradient-to-r w-200 from-teal-400 via-cyan-100 to-amber-200 block text-transparent bg-clip-text">{generating}</h1>}
                    <Output output={output} bgcolor={setBgcolor} timer={t}/>
                </div>
                <div className="row-span-1 bg-zinc-900 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl 
        border border-teal-300 hover:border-amber-200 transition-all flex">
                    <input type="text"  
                    value={input} 
                    onChange={(e)=>setInput(e.target.value)}
                    onKeyDown={handleChange}
                    placeholder="Type here" className="w-full h-full p-3 outline-none"></input>
                    <button className="text-teal-300 text-3xl hover:text-amber-200 hover:text-4xl transition-all">↑</button>
                </div>
            </div>
        </div>
    );
}
 
export default Home;