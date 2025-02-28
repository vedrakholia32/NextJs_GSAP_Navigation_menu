"use client";
import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const scrollTriggerSettings = {
      trigger: ".main",
      start: "top 40%",
      toggleActions: "play reverse play reverse",
    };

    const leftXValues = [-800, -900, -400];
    const rightXValues = [800, 900, 400];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];

    gsap.utils.toArray(".row").forEach((row, index) => {
      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");


      // Animate left card
      gsap.to(cardLeft, {
        x: leftXValues[index],
        y: yValues[index],
        rotate: leftRotationValues[index],
        scrollTrigger: {
          trigger: ".main",
          start: "top 40%",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardLeft.style.transform = `translateX(${progress * leftXValues[index]
              }px translateY${progress * yValues[index]}px rotate(${progress * leftRotationValues[index]
              }deg)`

            cardRight.style.transform = `translateX(${progress * rightXValues[index]
              }px translateY${progress * yValues[index]}px rotate(${progress * rightRotationValues[index]
              }deg)`
          }
        },
      });

      // Animate right card
      gsap.to(cardRight, {
        x: rightXValues[index],
        y: yValues[index],
        rotate: rightRotationValues[index],
        scrollTrigger: {
          trigger: ".main",
          start: "top 40%",
          end: "150% bottom",
          scrub: true,
        },
      });
    });

    // Other animations (logo, text, button) stay the same
    gsap.to(".logo", {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.set(".line p", { y: 30, opacity: 0 });
    gsap.to(".line p", {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.set(".cta-button", { x: 30, opacity: 0 });
    gsap.to(".cta-button", {
      y: 0,
      opacity: 1,
      delay: 0.25,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 2; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="card card-left">
            <img src={`/img-${2 * i - 1}.jpg`} alt="" />
          </div>
          <div className="card card-right">
            <img src={`/img-${2 * i}.jpg`} alt="" />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <ReactLenis root>
      <section className="hero">
        <div className="img">
          <img src="/upper.jpg" alt="" />
        </div>
      </section>

      <section className="main">
        <div className="main-content">
          <div className="logo">
            <img src="/image.jpg" alt="" />
          </div>

          <div className="copy">
            <div className="line">
              <p>Delve into coding</p>
            </div>
            <div className="line">
              <p>One subscription</p>
            </div>
            <div className="line">
              <p>Take the fast lane to mastery</p>
            </div>
          </div>

          <div>
            <button className="cta-button">Get PRO</button>
          </div>
        </div>

        {generateRows()}
      </section>

      <section className="footer">
        <Link href="#">Link in description</Link>
      </section>
    </ReactLenis>
  );
}
