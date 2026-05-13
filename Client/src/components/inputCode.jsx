import React, { useEffect, useState , useRef} from 'react'

export default function inputCode({}) {
    const [otp, setOtp] = useState(["","","",""]);
        const inputRefs = useRef([]);
    
        const handleChange = (value, index) => {
            if (!/^\d*$/.test(value)) return;
            const newOtp = [...otp];
            if(value.length > 1) {
                const pasted = value.slice(0,4).split("");
                pasted.forEach((digit,i)=>{
                    if(index + i < 4){
                        newOtp[index+i] = digit
                    }
                });
                setOtp(newOtp);
                const nextIndex = Math.min(index + pasted.length, 3);
                inputRefs.current[nextIndex]?.focus();
                return;
            }
            newOtp[index] = value;
            setOtp(newOtp);
    
            if(value && index < 3){
                inputRefs.current[index+1]?.focus();
            }
        };
    
        const handleKeyDown = (e, index) => {
            if(e.key === "Backspace") {
                if(otp[index]){
                    const newOtp = [...otp];
                    newOtp[index] = "";
                    setOtp(newOtp);
                } else if (index>0){
                    inputRefs.current[index -1]?.focus();
                }
            }
        };
    
    return (
        <div>
            <div className='pt-35'>
            <div className='flex items-center gap-4'>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(e1) => { inputRefs.current[index] = e1 }}
                        type='text'
                        inputMode='numeric'
                        maxLength={4}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className='w-14 h-14 text-center text-2xl font-bold rounded-2xl border-2 border-base-content/20 bg-base-200 focus:outline-none focus:border-primary transition-all'
                    />
                ))}

            </div>
        </div>
        </div>
    );
}