<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

// ---------------------- THEME TOGGLE (Unchanged) ----------------------
const isDark = ref(false);
const STORAGE_KEY = 'user-theme';

const updateHtmlClass = (newIsDark: boolean) => {
  document.documentElement.classList.toggle('dark', newIsDark);
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
  updateHtmlClass(isDark.value);
};

onMounted(() => {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  isDark.value = savedTheme
    ? savedTheme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

  updateHtmlClass(isDark.value);
});

// ---------------------- SCROLL TRIGGERS (Unchanged) ----------------------
const boxes = Array.from({ length: 4 }, (_, i) => `Box ${i + 1}`);

const setupScrollTriggers = () => {
  document.documentElement.style.scrollBehavior = 'smooth';

  boxes.forEach((_, index) => {
    const boxId = `#box-${index}`;

    gsap.timeline({
      scrollTrigger: {
        trigger: boxId,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        toggleActions: 'play none none reverse'
      }
    })
    .fromTo(
      boxId,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotation: -5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1
      }
    );
  });
};

// ---------------------- RANDOM SHAPES (Unchanged) ----------------------
const shapeCount = 10;
const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomGradients = [
  'from-red-400 to-yellow-400', 'from-blue-400 to-purple-500', 'from-green-400 to-teal-500',
  'from-pink-400 to-rose-500', 'from-indigo-400 to-blue-600', 'from-orange-400 to-pink-500',
  'from-yellow-500 to-orange-500', 'from-cyan-400 to-emerald-500', 'from-fuchsia-400 to-violet-500',
  'from-lime-400 to-sky-500',
];

const shapes = Array.from({ length: shapeCount }).map(() => {
  return {
    size: randomBetween(350, 650),
    top: randomBetween(5, 85),
    left: randomBetween(5, 85),
    rounded: Math.random() > 0.5 ? 'rounded-full' : 'rounded-2xl',
    gradient: randomGradients[randomBetween(0, randomGradients.length - 1)],
  };
});

// ---------------------- GSAP Background Animation Logic (Unchanged) ----------------------
const setupBackgroundAnimation = () => {
  for (let i = 0; i < shapeCount; i++) {
    const id = `#shape-${i}`;

    gsap.to(id, {
      xPercent: 'random(-200, 200)',
      yPercent: 'random(-200, 200)',
      rotation: 'random(-2000, 2000)',
      duration: 'random(15, 45)',
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });
  }
};

// ---------------------- GSAP Hero Text (Unchanged) ----------------------
const setupSplitTextAnimation = () => {
  document.fonts.ready.then(() => {
    gsap.set(".split", { opacity: 1 });

    const split = SplitText.create(".split", {
      type: "words",
    });

    gsap.from(split.words, {
      y: -100,
      opacity: 0,
      rotation: "random(-80, 80)",
      stagger: 0.1,
      duration: 1,
      ease: "back"
    });
  });
};

// ---------------------- NEW GSAP About Paragraph Animation ----------------------
const setupAboutSplitAnimation = () => {
  const element = document.querySelector(".about-text-split");
  if (!element) return;

  gsap.set(element, { opacity: 1 });

  document.fonts.ready.then(() => {
    let splitAnimation;

    SplitText.create(".about-text-split", {
      type: "words,lines",
      linesClass: "line",
      autoSplit: true,

      onSplit: (self) => {
        gsap.set(self.lines, { overflow: 'hidden' });

        splitAnimation = gsap.from(self.lines, {
          duration: 0.8,
          yPercent: 100,
          opacity: 0,
          stagger: 0.05,
          ease: "expo.out",
        });

        return splitAnimation;
      }
    });
  });
};

// ---------------------- ⭐ NEW — HORIZONTAL SLIDER ----------------------
const setupHorizontalScroll = () => {
  const section = document.querySelector("#horizontal-section");
  const wrapper = document.querySelector("#horizontal-wrapper");

  if (!section || !wrapper) return;

  // total horizontal scroll distance
  const scrollAmount = wrapper.scrollWidth - section.clientWidth;

  gsap.to(wrapper, {
    x: -scrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: `+=${scrollAmount}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  });
};

// ---------------------- MOUNT ALL GSAP ----------------------
onMounted(() => {
  setupHorizontalScroll();
  setupScrollTriggers();
  setupBackgroundAnimation();
  setupSplitTextAnimation();
  setupAboutSplitAnimation();
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
  document.documentElement.style.scrollBehavior = 'auto';
});
</script>

<template>
<div
  class="min-h-screen transition-colors duration-500 relative overflow-hidden"
  :class="{
    'bg-[#0E100F] text-gray-900 dark:text-gray-100': isDark,
    'bg-white text-gray-900 dark:text-gray-900': !isDark,
  }"
>

    <div
      v-for="(shape, i) in shapes"
      :id="`shape-${i}`"
      :key="i"
      class="absolute pointer-events-none blur-3xl opacity-40"
      :class="[shape.rounded, `bg-gradient-to-br ${shape.gradient}`]"
      :style="{
        width: shape.size + 'px',
        height: shape.size + 'px',
        top: shape.top + '%',
        left: shape.left + '%',
        transform: 'translate(-50%, -50%)'
      }"
    ></div>

    <section class="h-screen flex flex-col justify-between p-8 md:p-16 relative z-10">
      <nav class="flex justify-between items-center w-full">
        <div class="text-xl font-semibold"><span class="icon-[mdi--alternate-email] h-4 w-4"></span>BigMark11</div>

        <label
          class="relative block aspect-[2/0.75] w-20 rounded-full
          bg-gradient-to-br from-purple-100 via-violet-600 shadow-2xl
          transition-all duration-300"
        >
          <input class="peer/input hidden" type="checkbox" @click.stop="toggleTheme">
          <div
class="absolute left-[3%] top-1/2 aspect-square h-[90%]
              -translate-y-1/2 rotate-180 rounded-full bg-white
              transition-all duration-500
              peer-checked/input:left-[63%] peer-checked/input:-rotate-6"
          ></div>
        </label>
      </nav>

      <div class="flex-grow flex flex-col md:flex-row items-center justify-between pt-16 md:pt-0">

        <div class="w-full md:w-[55%] flex flex-col justify-center items-start space-y-4">
          <h1 class="split text-6xl md:text-7xl font-serif font-bold opacity-0">
            Mark Anthony Olivares.
          </h1>

          <p class="text-lg md:text-xl opacity-80">Front-End Developer</p>

          <p class="about-text-split text-ld md:text-2xl max-w-2xl opacity-0 overflow-hidden">
            I am a Dynamic and results-oriented Frontend Developer with over 3 years of experience in creating responsive and scalable web applications. I am highly skilled in modern JavaScript frameworks, particularly Vue.js (Vue 2/Vue 3), Nuxt.js, and Tailwind CSS , with strong proficiency in API integration and high-quality UI/UX implementation. I bring a commitment to continuous improvement to deliver innovative digital solutions.
          </p>

          <!-- <a
            href="mailto:olivaresmarkanthony14@gmail.com"
            class="flex items-center text-sm bg-black text-white h-12 px-4 py-2 rounded-md"
          >
            <span class="mr-3">Contact Me</span>
            <span class="icon-[mdi--email-fast] h-5 w-5"></span>
          </a> -->

          <!-- From Uiverse.io by elijahgummer -->
          <a
            href="mailto:olivaresmarkanthony14@gmail.com"
            class="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-12 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2"
          >
            <span
              class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"
            ></span>
            <div class="flex items-center">
              <span class="ml-1 text-white">Send me an Email</span>
            </div>
            <div class="ml-2 flex items-center gap-1 text-sm md:flex">
              <span class="icon-[mdi--email-fast] h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-yellow-300"></span>

            </div>
          </a>


        </div>

        <div class="w-full md:w-[45%] flex justify-center items-center mt-12 md:mt-0">
          <img
            src="/img/myself-img-1.png"
            alt="Mark Anthony Olivares"
            class="max-h-[800px] w-auto object-contain"
          />
        </div>

      </div>
    </section>

      <main class="max-w-4xl mx-auto py-80 md:py-24 px-8 relative z-10">
      <section id="horizontal-section" class="w-full overflow-hidden py-10 mb-40">
        <h2 class="text-4xl font-bold mb-16 text-center">Recent Projects</h2>

        <div id="horizontal-wrapper" class="flex">
          <div
            v-for="n in 5"
            :key="n"
            class="w-screen h-60 flex-shrink-0 flex items-center justify-center
            rounded-xl shadow-xl bg-white dark:bg-gray-800 text-3xl font-bold"
          >
            Slide {{ n }}
          </div>
        </div>
      </section>


      <div class="space-y-40">
        <!-- <div
          v-for="(item, index) in boxes"
          :id="`box-${index}`"
          :key="index"
          class="h-72 w-full flex items-center justify-center text-3xl font-bold
          rounded-xl shadow-2xl bg-white dark:bg-gray-800"
        >
          {{ item }}
        </div> -->
        <div
          id="box-0"
          class="w-full flex flex-col items-center justify-center text-3xl font-bold
          "
        >
          <h2 class="text-4xl font-bold mb-16 text-center">ABOUT ME</h2>
          <p class="about-text-split ">
            My interest in Computer Programming started back in 2011 when I decide to check the elements on the browser — turns out that all the Elements I see on the browser was HTML amd CSS!. Fast-forward today I'm now a Frontend Developer with 4+ years work experience.
          </p>

          <!-- From Uiverse.io by Javierrocadev -->
          <div class="w-full flex items-center justify-center gap-2 md:gap-12 mt-16">
            <div
                class="hover:-translate-y-2 group bg-white/10 backdrop-blur-xl border border-white/20
                duration-500 w-44 h-44 flex text-neutral-600 flex-col justify-center
                items-center relative rounded-xl overflow-hidden shadow-xl"
              >

                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
                >
                  <path
                    transform="translate(100 100)"
                    d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
                  ></path>
                </svg>

                <div class="z-20 flex flex-col justify-center items-center text-white drop-shadow">
                  <span class="font-bold text-5xl ml-2">34+</span>
                  <p class="text-center text-sm">Years of Experience</p>
                </div>
            </div>
            <div
                class="hover:-translate-y-2 group bg-white/10 backdrop-blur-xl border border-white/20
                duration-500 w-44 h-44 flex text-neutral-600 flex-col justify-center
                items-center relative rounded-xl overflow-hidden shadow-xl"
              >

                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
                >
                  <path
                    transform="translate(100 100)"
                    d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
                  ></path>
                </svg>

                <div class="z-20 flex flex-col justify-center items-center text-white drop-shadow">
                  <span class="font-bold text-5xl ml-2">34+</span>
                  <p class="text-center text-sm">Completed Projects</p>
                </div>
            </div>
                        <div
                class="hover:-translate-y-2 group bg-white/10 backdrop-blur-xl border border-white/20
                duration-500 w-44 h-44 flex text-neutral-600 flex-col justify-center
                items-center relative rounded-xl overflow-hidden shadow-xl"
              >

                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
                >
                  <path
                    transform="translate(100 100)"
                    d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
                  ></path>
                </svg>

                <div class="z-20 flex flex-col justify-center items-center text-white drop-shadow">
                  <span class="font-bold text-5xl ml-2">34+</span>
                  <p class="text-center text-sm">Companies Worked</p>
                </div>
            </div>
          </div>

          <div class="mt-16">
            <a
              href="/file/Olivares_CV_Frontend.pdf"
              download="Mark-Olivares-CV.pdf"
              class="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none
              focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none
              disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-12 px-4 py-2
              max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2
              rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black
              hover:ring-offset-2"
            >
              <span
                class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white
                opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"
              ></span>

              <div class="flex items-center">
                <span class="ml-1 text-white">Download CV</span>
              </div>

              <div class="ml-2 flex items-center gap-1 text-sm md:flex">
                <span
class="icon-[mdi--file-download] h-5 w-5 text-gray-500 transition-all
                duration-300 group-hover:text-blue-500"></span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </main>

    <section
      class="h-screen flex items-center justify-center bg-green-600 text-white relative z-10"
      style="background: linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%);"
    >
      <h2 class="text-4xl">End of Content</h2>
    </section>

</div>
</template>
