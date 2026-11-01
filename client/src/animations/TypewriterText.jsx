import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const TypewriterText = ({ text }) => {
  const id = `typewriter-${Math.random().toString(36).substring(2, 8)}`;
  const characterCount = text.length;

  const keyframes = `
    @keyframes ${id}-typing {
      from { width: 0ch; }
      to { width: ${characterCount}ch; }
    }
      
  `;

  const { ref, inView } = useInView({ triggerOnce: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  if (inView && !hasAnimated) {
    setHasAnimated(true);
  }

  return (
    <>
      <style>{keyframes}</style>
      <p
        ref={ref}
        className="whitespace-nowrap overflow-hidden max-[375px]:text-3xl border-r border-black dark:border-slate-300 inline-block"
        style={{
          width: hasAnimated ? `${characterCount}ch` : '0ch',
          animation: hasAnimated
            ? `${id}-typing 3s steps(${characterCount}, end) forwards, blink 1s step-end infinite`
            : 'none'
        }}
      >
        {text}
      </p>
    </>
  );
};

export default TypewriterText;



// import React from 'react';

// const TypewriterText = ({ text }) => {
//   const id = `typewriter-${Math.random().toString(36).substring(2, 8)}`;
//   const characterCount = text.length;

//   const keyframes = `
//     @keyframes ${id}-typing {
//       from { width: 0ch; }
//       to { width: ${characterCount}ch; }
//     }
//   `;

//   return (
//     <>
//       <style>{keyframes}</style>
//       <p className=" whitespace-nowrap overflow-hidden border-r border-black dark:border-slate-300 inline-block"
//         style={{
//           animation: `${id}-typing 3s steps(${characterCount}, end) forwards, blink 0.75s step-end forwards`
//         }} >
//         {text}
//       </p>
//     </>
//   );
// };

// export default TypewriterText;