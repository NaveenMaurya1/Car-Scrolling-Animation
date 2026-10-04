"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const car = carRef.current;
      const trail = trailRef.current;

      const letters = gsap.utils.toArray(".value-letter");

      
    //    Initial letter state
       
      gsap.set(letters, {
        opacity: 0,
      });

      
        // Initial green trail
        // 6% green / 94% black
       
      gsap.set(trail, {
        width: "6%",
      });

      
    //    Main car + road animation
       
      const animation = gsap.to(car, {
        x: () => window.innerWidth - 180,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: ".track",
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            
            // Scroll progress
             
            //  0   = beginning
            //  1   = ending
           const progress = self.progress;
            
            //   Green starts at 6%
            //   Green ends at 94%
             
           const trailWidth =  6 + 88 * progress;
             

            
            //   Expand green trail
            //   Black area automatically becomes smaller
             
            gsap.set(trail, {
              width: `${trailWidth}%`,
            });

            
            //   Get the right edge of green area
             
            const trailRect =
              trail.getBoundingClientRect();

            const trailRight = trailRect.right;

            
            //   Reveal letters when green
            //   reaches each letter
            
            letters.forEach((letter) => {
              const letterRect =
                letter.getBoundingClientRect();

              const letterCenter =
                letterRect.left +
                letterRect.width / 2;

              if (trailRight >= letterCenter) {
                gsap.set(letter, {
                  opacity: 1,
                });
              } else {
                gsap.set(letter, {
                  opacity: 0,
                });
              }
            });
          },
        },
      });

   
    //    Statistics
    
      const stats = [
        {
          selector: "#box1",
          start: "top+=300 top",
          end: "top+=500 top",
        },
        {
          selector: "#box2",
          start: "top+=500 top",
          end: "top+=700 top",
        },
        {
          selector: "#box3",
          start: "top+=700 top",
          end: "top+=900 top",
        },
        {
          selector: "#box4",
          start: "top+=900 top",
          end: "top+=1100 top",
        },
      ];

      stats.forEach((stat) => {
        gsap.to(stat.selector, {
          opacity: 1,
          y: 0,

          scrollTrigger: {
            trigger: sectionRef.current,
            start: stat.start,
            end: stat.end,
            scrub: true,
          },
        });
      });

      
    //   Refresh ScrollTrigger after setup
       
      ScrollTrigger.refresh();

      return () => {
        animation.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/*  HERO ANIMATION  */}

      <section ref={sectionRef} className="hero-section relative h-[200vh] bg-[#121212]">

        <div className="track sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#d1d1d1]">

          {/*  ROAD  */}

          <div className="road relative h-50 w-full overflow-hidden bg-[#1e1e1e]">

            {/* GREEN TRAIL  */}

            <div
              ref={trailRef}
              className="absolute left-0 top-0 z-1 h-50 bg-[#45db7d]"
              style={{ width: "6%" }}
            />

            {/*  HEADING */}

            <div className="value-add absolute left-[5%] top-[15%] z-5 flex gap-[4.8px] text-[8rem] font-sans font-bold leading-none tracking-wide">

              {"WELCOME ITZFIZZ".split("").map(
                (letter, index) => (
                  <span
                    key={index}
                    className="value-letter text-[#111]"
                  >
                    {letter === " "
                      ? "\u00A0"
                      : letter}
                  </span>
                )
              )}

            </div>

            {/*  CAR */}

            <img
              ref={carRef}
              src="/Car-Scrolling-Animation/McLaren-720S.png"
              alt="McLaren"
              className="car absolute left-0 top-0 z-10 h-50 w-auto max-w-none object-contain"
            />

          </div>

          {/* STATISTICS */}

          <div
            id="box1"
            className="text-box absolute right-[31%] top-[7%] z-20 flex  flex-col  text-[18px] rounded-xl bg-[#def54f] px-7.5 py-5 text-[#111] opacity-0"
          >
            <span className="text-[58px] font-bold">
              58%
            </span>            
            <span>            
              Increase in pick up point use           
            </span>            
          </div>

          <div
            id="box2"
            className="text-box absolute bottom-[7.5%] right-[36%] z-20 flex  flex-col  rounded-xl bg-[#6ac9ff] px-7.5 py-5 text-[#111] opacity-0"
          >
            <span className="text-[58px] font-bold">
              23%
            </span>

           <span>
              Decreased in customer phone calls
            </span>
          </div>

          <div
            id="box3"
            className="text-box absolute right-[11%] top-[7%] z-20 flex  flex-col  rounded-xl bg-[#333] px-7.5 py-5 text-white opacity-0"
          >
            <span className="text-[58px] font-bold">
              27%
            </span>

            <span>
              Increase in pick up point use
            </span>
          </div>

          <div
            id="box4"
            className="text-box absolute bottom-[7.5%] right-[13.5%] z-20 flex flex-col  rounded-xl bg-[#fa7328] px-7.5 py-5 text-[#111] opacity-0"
          >
            <span className="text-[58px] font-bold">
              40%
            </span>

            <span>
              Decreased in customer phone calls
            </span>
          </div>

        </div>
      </section>

      {/*  CONTENT AFTER ANIMATION  */}

      <section className="min-h-screen ">

        <div>
          
        </div>

      </section>
    </main>
  );
}