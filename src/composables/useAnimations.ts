import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function useAnimations() {
  const animateShapes = (count: number) => {
    for (let i = 0; i < count; i++) {
      gsap.to(`#shape-${i}`, {
        xPercent: "random(-200, 200)",
        yPercent: "random(-200, 200)",
        rotation: "random(-2000, 2000)",
        duration: "random(15, 45)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  };

  const splitHeroText = () => {
    document.fonts.ready.then(() => {
      gsap.set(".split", { opacity: 1 });
      const split = SplitText.create(".split", { type: "words" });

      gsap.from(split.words, {
        opacity: 0,
        y: -100,
        rotation: "random(-80,80)",
        stagger: 0.1,
        ease: "back",
        duration: 1
      });
    });
  };

  const splitAboutText = () => {
    document.fonts.ready.then(() => {
      SplitText.create(".about-text-split", {
        type: "words,lines",
        linesClass: "line",
        onSplit(self: any) {
          gsap.set(self.lines, { overflow: "hidden" });
          gsap.from(self.lines, {
            yPercent: 100,
            opacity: 0,
            stagger: 0.05,
            ease: "expo.out",
            duration: 0.8
          });
        }
      });
    });
  };

  const animateFooterBounce = () => {
    gsap.from("#contact-section", {
      y: 200,
      opacity: 0,
      ease: "bounce.out",
      duration: 1.4,
      scrollTrigger: {
        trigger: "#contact-section",
        start: "top bottom",
        toggleActions: "play none none reverse"
      }
    });
  };

  return {
    animateShapes,
    splitHeroText,
    splitAboutText,
    animateFooterBounce
  };
}
