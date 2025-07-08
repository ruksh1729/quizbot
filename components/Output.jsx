import { useEffect, useState } from "react";

const Output = ({output ,bgcolor, timer}) => {
    
    const [questions, setQuestions] = useState('');
    const [current, setCurrent] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [count, setCount]=useState(0);
    const [timeLeft, setTimeLeft] = useState(timer);

    useEffect(() => {
        if (!output || !timer) return;
        setTimeLeft(timer);
    }, [output, timer]);


    useEffect(() => {
    if (!output) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    }, [output]);

    useEffect(()=>{
        if(!output) return;
        const lines = output.split("\n").filter(Boolean);
        const grouped = [];
        for(let i=0; i<lines.length; i+=6){
            const q=lines[i];
            const options = lines.slice(i+1,i+5);
            const answerLine = lines[i+5];
            const correct = answerLine?.match(/Correct Answer: (\w)/)?.[1];
            grouped.push({
                question: q,
                options,
                correct
            })
        }
        setQuestions(grouped);
        setCurrent(0);
        setCount(0);
        setFeedback(null);
        bgcolor('bg-zinc-900');
    },[output]);

    const handleNewQuiz=()=>{
        window.location.reload();
    }

    const handleAnswer = (optionLetter) => {
        const isCorrect = optionLetter === questions[current].correct;
        setFeedback(isCorrect ? "correct" : "wrong");
        bgcolor(isCorrect ? 'bg-green-400' : 'bg-red-400');
        setCount(isCorrect ? (prev)=>prev+1:(prev)=>prev+0);
        setTimeout(() => {
        setCurrent((prev) => prev + 1);
        setFeedback(null);
        bgcolor('bg-zinc-900');
        }, 1000);
    };
    
    const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};



    if (questions.length === 0) return null;
    if (timeLeft <= 0) return (
    <div className="mt-25 text-center text-4xl bg-gradient-to-r w-200 from-teal-400 via-cyan-100 to-amber-200 block text-transparent bg-clip-text font-mono">
        <h1>⏰ Time's up!</h1><br/><br/>
        <span>You scored {count} out of {current}</span><br/><br/>
        <span><button onClick={handleNewQuiz} className="w-75 h-15 text-center pt-1 ml-65 mt-10 rounded-xl border-2 flex flex-col border-teal-300 text-white hover:bg-teal-300 hover:text-black transition-all">Start new Quiz</button></span>
    </div>
    );
    if (current >= questions.length) return <div className="mt-25 text-center text-4xl bg-gradient-to-r w-200 from-teal-400 via-cyan-100 to-amber-200 block text-transparent bg-clip-text font-mono">
        <h1>🎉 Quiz Complete!<br/><br/><br/><br/></h1>
        <span>You scored {count} out of {current}</span><br/><br/>
        <span><button onClick={handleNewQuiz} className="w-75 h-15 text-center pt-1 ml-65 mt-10 rounded-xl border-2 flex flex-col border-teal-300 text-white hover:bg-teal-300 hover:text-black transition-all">Start new Quiz</button></span>
        </div>;
    const currentQ = questions[current];

    return (  
        <div>
            <div className="text-2xl text-white font-mono">
                 Time Left: {formatTime(timeLeft)}
            </div>
            <div className=" mt-20 bg-zinc-950 w-200 p-1 pr-5 m-auto rounded-4xl transition-all flex font-mono">
                <div className="w-100 pl-3 pt-5 text-white text-lg"><span>{current+1+'. '}</span>{currentQ.question}</div>
                <div className="w-100 p-3 flex flex-col object-right">
                    {currentQ.options.map((opt)=>{
                        const letter = opt.trim()[0];
                        return(
                            <button
                                key={letter}
                                onClick={()=>handleAnswer(letter)}
                                className={`m-2 p-3 rounded-xl text-left border-2 flex flex-col transition-all justify-center ${
                                feedback
                                ? letter === currentQ.correct
                                    ? "border-green-400 bg-green-200 text-black"
                                    : "border-red-400 bg-red-200 text-black"
                                : "border-teal-300 text-white hover:bg-teal-300 hover:text-black transition-all"
                            }`}
                            disabled={!!feedback}
                            >
                                {opt}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
 
export default Output;