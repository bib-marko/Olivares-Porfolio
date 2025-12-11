<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Icon } from '@iconify/vue';
import 'animate.css';
import WorkExperience from '@/components/WorkExperience.vue'
import { useProjectList } from '@/composables/useProjectList'

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

// ---------------------- THEME TOGGLE ----------------------
const isDark = ref(false);
const STORAGE_KEY = 'user-theme';
const { projectList } = useProjectList();

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

// ---------------------- DATA / TECH LIST ----------------------
const techList = {
  frontend: [
    { name: 'VUE', icon: 'logos:vue' },
    { name: 'REACT', icon: 'logos:react' },
    { name: 'JAVASCRIPT', icon: 'logos:javascript' },
    { name: 'TYPESCRIPT', icon: 'logos:typescript-icon' },
    { name: 'JQUERY', icon: 'devicon:jquery' },
    { name: 'NUXT', icon: 'logos:nuxt-icon' },
    { name: 'MATERIAL UI', icon: 'logos:material-ui' },
    { name: 'TAILWINDCSS', icon: 'logos:tailwindcss-icon' },
    { name: 'BOOTSTRAP', icon: 'logos:bootstrap' },
    { name: 'HTML 5', icon: 'logos:html-5' },
    { name: 'CSS 3', icon: 'logos:css-3' },
    { name: 'NAIVEUI', icon: 'logos:naiveui' },
    { name: 'ELEMENT', icon: 'logos:element' },
    { name: 'ES6', icon: 'logos:es6' },
    { name: 'VUETIFYJS', icon: 'logos:vuetifyjs' },
    { name: 'ANT DESIGN', icon: 'logos:ant-design' },
    { name: 'GSAP', icon: 'simple-icons:gsap' },
    { name: 'PWA', icon: 'simple-icons:pwa' },
    { name: 'VANT UI', icon: 'fluent-color:code-16' },
    { name: 'VITE', icon: 'vscode-icons:file-type-vite' },
    { name: 'BUN', icon: 'vscode-icons:file-type-bun' },
    { name: 'JEST', icon: 'material-icon-theme:jest' },
    { name: 'CYPRESS', icon: 'vscode-icons:file-type-cypress' }
  ],
  backend: [
    { name: 'SPRING', icon: 'logos:spring-icon' },
    { name: 'LARAVEL', icon: 'devicon:laravel' },
    { name: 'PHP', icon: 'devicon:php' },
    { name: 'MYSQL', icon: 'devicon:mysql' },
    { name: 'MARIADB', icon: 'simple-icons:mariadb' },
    { name: 'JAVA', icon: 'devicon:java' },
    { name: 'GRAPHQL', icon: 'material-icon-theme:graphql' },
    { name: 'REST API', icon: 'dashicons:rest-api' }
  ],
  other: [
    { name: 'GITHUB', icon: 'skill-icons:github-dark' },
    { name: 'GITLAB', icon: 'logos:gitlab-icon' },
    { name: 'FIGMA', icon: 'devicon:figma' },
    { name: 'PHOTOSHOP', icon: 'vscode-icons:file-type-photoshop' },
    { name: 'WEBFLOW', icon: 'skill-icons:webflow' },
    { name: 'SEO', icon: 'tabler:seo' },
    { name: 'JIRA', icon: 'logos:jira' },
    { name: 'CONFLUENCE', icon: 'devicon:confluence' },
    { name: 'DBEAVER', icon: 'devicon:dbeaver' },
    { name: 'VSCODE', icon: 'vscode-icons:file-type-vscode' },
    { name: 'INTELLIJ', icon: 'devicon:intellij' },
    { name: 'SOURCETREE', icon: 'logos:sourcetree' },
    { name: 'BITBUCKET', icon: 'logos:bitbucket' },
    { name: 'SWAGGER', icon: 'devicon:swagger' },
    { name: 'AGILE', icon: 'iconoir:agile' },
    { name: 'XAMPP', icon: 'logos:xampp' }
  ]
};

// ---------------------- RANDOM SHAPES ----------------------
const shapeCount = 100;
const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomGradients = [
  'from-red-400 to-yellow-400',
  'from-blue-400 to-purple-500',
  'from-green-400 to-teal-500',
  'from-pink-400 to-rose-500',
  'from-indigo-400 to-blue-600',
  'from-orange-400 to-pink-500',
  'from-yellow-500 to-orange-500',
  'from-cyan-400 to-emerald-500',
  'from-fuchsia-400 to-violet-500',
  'from-lime-400 to-sky-500'
];

const shapes = Array.from({ length: shapeCount }).map(() => {
  return {
    size: randomBetween(350, 650),
    top: randomBetween(5, 85),
    left: randomBetween(5, 85),
    rounded: Math.random() > 0.5 ? 'rounded-full' : 'rounded-2xl',
    gradient: randomGradients[randomBetween(0, randomGradients.length - 1)]
  };
});

// ---------------------- GSAP — Background animation ----------------------
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
      yoyo: true
    });
  }
};

// ---------------------- GSAP — Hero / SplitText ----------------------
const setupSplitTextAnimation = () => {
  document.fonts.ready.then(() => {
    gsap.set('.split', { opacity: 1 });

    const split = SplitText.create('.split', {
      type: 'words'
    });

    gsap.from(split.words, {
      y: -100,
      opacity: 0,
      rotation: 'random(-80, 80)',
      stagger: 0.1,
      duration: 1,
      ease: 'back'
    });
  });
};

const setupAboutSplitAnimation = () => {
  const element = document.querySelector('.about-text-split');
  if (!element) return;

  gsap.set(element, { opacity: 1 });

  document.fonts.ready.then(() => {
    SplitText.create('.about-text-split', {
      type: 'words,lines',
      linesClass: 'line',
      autoSplit: true,
      onSplit: (self: any) => {
        gsap.set(self.lines, { overflow: 'hidden' });

        const splitAnimation = gsap.from(self.lines, {
          duration: 0.8,
          yPercent: 100,
          opacity: 0,
          stagger: 0.05,
          ease: 'expo.out'
        });

        return splitAnimation;
      }
    });
  });
};

// ---------------------- HORIZONTAL SLIDER ----------------------
const setupHorizontalScroll = () => {
  const section = document.querySelector('#horizontal-section') as HTMLElement;
  const wrapper = document.querySelector('#horizontal-wrapper') as HTMLElement;

  if (!section || !wrapper) return;

  ScrollTrigger.matchMedia({

    "(min-width: 768px)": function () {
      // Desktop behavior
      const scrollAmount =
        wrapper.scrollWidth - section.clientWidth;

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
          invalidateOnRefresh: true,
        },
      });
    },

    "(max-width: 767px)": function () {
      // Mobile behavior (must recalc differently)
      const getScrollAmount = () =>
        wrapper.scrollWidth - section.offsetWidth;

      gsap.to(wrapper, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getScrollAmount(),
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }
  });
};

// ---------------------- SCROLL TRIGGERS (entrance animations) ----------------------
const setupScrollTriggers = () => {
  document.documentElement.style.scrollBehavior = 'smooth';

  const sectionsToAnimate = ['#vertical-snap-0', '#vertical-snap-1'];

  sectionsToAnimate.forEach((boxId) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: boxId,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        toggleActions: 'play none none reverse'
      }
    }).fromTo(
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

// ---------------------- VERTICAL SNAP ----------------------
const setupVerticalSnap = () => {
  const sectionsToSnap = document.querySelectorAll('.snap-section');

  if (sectionsToSnap.length < 2) return;

  const snapPoints = Array.from(sectionsToSnap).map((_, index) =>
    index / (sectionsToSnap.length - 1)
  );

  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    snap: {
      snapTo: snapPoints,
      duration: 0.5,
      ease: 'power2.inOut'
    }
  });
};

const setupFooterBounce = () => {
  const section = document.querySelector("#contact-section");
  if (!section) return;

  gsap.from(section, {
    y: 200,
    opacity: 0,
    ease: "bounce.out",
    duration: 1.4,
    scrollTrigger: {
      trigger: section,
      start: "top bottom",  // when it first enters view
      end: "bottom bottom",
      toggleActions: "play none none reverse"
    }
  });
};


// ---------------------- MOUNT / UNMOUNT ----------------------
onMounted(() => {
  setupHorizontalScroll();
  setupScrollTriggers();
  setupBackgroundAnimation();
  setupSplitTextAnimation();
  setupAboutSplitAnimation();
  setupVerticalSnap();
  setupFooterBounce();
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  document.documentElement.style.scrollBehavior = 'auto';
});

// ---------------------- FULLSCREEN IMAGE VIEWER ----------------------
const fullscreenImg = ref<string | null>(null);

const openFullscreen = (img: string) => {
  fullscreenImg.value = img;

  nextTick(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      "#fullscreen-viewer",
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" }
    );
    tl.fromTo(
      "#fullscreen-img",
      { scale: 0.4, opacity: 0, y: 80 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "expo.out" },
      "<"
    );
  });
};

const closeFullscreen = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      fullscreenImg.value = null;
    }
  });

  tl.to("#fullscreen-img", {
    scale: 0.4,
    opacity: 0,
    duration: 0.3,
    ease: "expo.in"
  });

  tl.to(
    "#fullscreen-viewer",
    {
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut"
    },
    "<"
  );
};

// ESC key closes viewer
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeFullscreen();
});


</script>

<template>
<div
  class="min-h-screen transition-colors duration-500 relative overflow-hidden"
    :class="[
      isDark
        ? 'text-gray-100 bg-[radial-gradient(129%_99%_at_112%_85%,rgb(40,40,60)_20%,rgb(10,10,20)_90%),url(https://assets.codepen.io/16327/noise-e82662fe.png)] bg-blend-color-dodge'
        : 'text-gray-900 bg-[radial-gradient(129%_99%_at_112%_85%,rgb(223,220,255)_20%,rgb(166,158,255)_90%),url(https://assets.codepen.io/16327/noise-e82662fe.png)] bg-blend-color-dodge'
    ]"

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
        <div class="flex justify-between items-center font-sans text-xl font-semibold"><Icon icon="mdi:alternate-email" class="h-4 w-4" />BigMark11</div>

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
              <Icon icon="mdi:email-fast" class="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-yellow-300" />
            </div>
          </a>


        </div>

        <div class="w-full md:w-[45%] flex justify-center items-center mt-12 md:mt-0 animate__animated animate__lightSpeedInRight">
          <img
            src="/img/myself-img-1.png"
            alt="Mark Anthony Olivares"
            class="max-h-[800px] w-auto object-contain"
          />
        </div>

      </div>
    </section>

    <main class="max-w-full mx-auto py-80 md:py-24 px-4 relative z-10">
      <section id="horizontal-section" class="w-full overflow-hidden py-10 h-[110vh] md:h-auto">
        <h2 class="text-4xl font-bold mb-8 text-center">Recent Projects</h2>

      <div id="horizontal-wrapper" class="flex space-x-12 px-2 w-max">
        <div
          v-for="(data, index) in projectList"
          :key="index"
          class="w-screen flex-shrink-0 flex flex-col items-center bg-transparent"
        >
          <div class="w-full flex items-center justify-center gap-4 flex-col md:flex-row relative z-10">
            <div
              v-for="img in data.imgUrl"
              :key="img"
              class="card rounded-lg outline-offset-3 outline-dashed p-1"
            >
              <img
                :src="img"
                class="w-full max-w-[350px] md:max-w-[700px] object-contain mx-auto rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                @click="openFullscreen(img)"

              />
            </div>
          </div>
        <div class="w-full max-w-[350px] md:max-w-[720px] flex flex-col items-center mt-4 relative z-10">
          <h3 class="split text-2xl text-center font-bold">{{ data.title }}</h3>
          <p class="w-full  mx-auto">{{ data.short_desc }}</p>

        </div>
        <div class="w-full max-w-[350px] md:max-w-[700px] flex flex-wrap gap-2 mt-2">
          <span
            v-for="(stack, ind) in data.tech"
            :key="ind"
            class="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 gap-1
                  border text-sm whitespace-nowrap
                  border-purple-500
                  text-purple-700 bg-purple-50
                  dark:border-purple-300 dark:text-purple-300 dark:bg-purple-900/40"
          >
            {{ stack }}
          </span>
        </div>


        </div>
      </div>

      </section>


      <!-- FULLSCREEN IMAGE VIEWER -->
<div
  v-if="fullscreenImg"
  id="fullscreen-viewer"
  class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999]"
  @click="closeFullscreen"
>
  <img
    id="fullscreen-img"
    :src="fullscreenImg"
    class="max-w-[92vw] max-h-[92vh] rounded-lg shadow-2xl select-none"
  />
</div>



      <div class="space-y-50 w-full max-w-7xl mx-auto px-4">
        <div
          id="box-0"
          class=" flex flex-col items-center justify-center text-sm md:text-lg mt-10"
        >
          <h2 class="text-4xl font-bold text-center">ABOUT ME</h2>
          <h2 class="text-xl font-bold mb-16 text-center opacity-50">Personal</h2>
          <p class="about-text-split">
            The interest in computer programming began in 2016 after exploring a webpage’s elements and realizing that everything seen in the browser was built with HTML and CSS. That moment sparked a deep curiosity that ultimately evolved into a passion for development. Today, that early fascination has grown into a career as a Frontend Developer with over three years of hands-on experience delivering modern, responsive, and high-quality web applications.
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

                <div class="z-10 flex flex-col justify-center items-center text-white drop-shadow">
                  <span class="font-bold text-5xl ml-2">3</span>
                  <p class="text-center text-xs md:text-sm">Years of Experience</p>
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

                <div class="z-10 flex flex-col justify-center items-center text-white drop-shadow">
                  <span class="font-bold text-5xl ml-2">9</span>
                  <p class="text-center text-xs md:text-sm">Completed Projects</p>
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

                <div class="z-10 flex flex-col justify-center items-center text-white drop-shadow">
                  <span class="font-bold text-5xl ml-2">4</span>
                  <p class="text-center text-xs md:text-sm">Companies Worked</p>
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
                <Icon icon="mdi:file-download" class="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-blue-500" />
              </div>
            </a>
          </div>

        </div>

        <div
          id="box-1"
          class="w-full flex flex-col items-center justify-center text-3xl font-bold mt-8
          "
        >
          <h2 class="text-4xl font-bold text-center">SKILLS</h2>
          <h2 class="text-xl font-bold mb-16 text-center opacity-50">My Technical Level</h2>

          <div class="flex flex-wrap justify-center gap-4 w-full">
            <!-- Frontend card -->
            <div class="group relative w-full md:w-[380px] max-w-sm">
              <div class="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10">
                <div class="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/100 blur-2xl transition-all duration-500 group-hover:scale-250 group-hover:opacity-70" />
                <div class="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/100 blur-2xl transition-all duration-500 group-hover:scale-250 group-hover:opacity-70" />

                <div class="relative p-6">
                  <div class="absolute right-6 top-6">
                    <Icon icon="mingcute:asterisk-fill" class="h-10 w-10 text-indigo-500/90" />
                  </div>

                  <div class="flex items-center text-xl">
                    <span :class="{ 'text-white': !isDark }">Frontend Developer</span>
                  </div>

                  <div class="-mt-1">
                    <h3 class="text-sm font-semibold text-blue-500/90">More than 3 years</h3>
                  </div>

                  <div class="mt-6 flex items-center gap-4">
                    <div class="grid grid-cols-5 gap-2">
                      <div v-for="item in techList.frontend" :key="item.name" class="rounded-xl p-2">
                        <div class="flex items-center justify-center gap-3 group cursor-pointer">
                          <Icon :icon="item.icon || 'solar:code-bold'" class="h-12 w-12 text-gray-500 transition-all duration-300 hover:brightness-150 hover:text-yellow-300 hover:scale-110" />
                        </div>
                        <p class="mt-1 text-[9px] text-slate-400 text-center">{{ item.name || '-' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Backend card -->
            <div class="group relative w-full md:w-[380px] max-w-sm">
              <div class="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10">
                <div class="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/100 blur-2xl transition-all duration-500 group-hover:scale-250 group-hover:opacity-70" />
                <div class="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/100 blur-2xl transition-all duration-500 group-hover:scale-250 group-hover:opacity-70" />

                <div class="relative p-6">
                  <div class="absolute right-6 top-6">
                    <Icon icon="solar:database-line-duotone" class="h-10 w-10 text-indigo-500/90" />
                  </div>

                  <div class="flex items-center text-xl">
                    <span :class="{ 'text-white': !isDark }">Backend Developer</span>
                  </div>

                  <div class="-mt-1">
                    <h3 class="text-sm font-semibold text-blue-500/80">More than 2 Years</h3>
                  </div>

                  <div class="mt-6 flex items-center gap-4">
                    <div class="grid grid-cols-5 gap-2">
                      <div v-for="item in techList.backend" :key="item.name" class="rounded-xl p-2">
                        <div class="flex items-center justify-center gap-3 cursor-pointer">
                          <Icon :icon="item.icon || 'solar:code-bold'" class="h-12 w-12 text-gray-500 transition-all duration-300 hover:brightness-150 hover:text-yellow-300 hover:scale-110" />
                        </div>
                        <p class="mt-1 text-[9px] text-slate-400 text-center">{{ item.name || '-' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Others card -->
            <div class="group relative w-full md:w-[380px] max-w-sm">
              <div class="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10">
                <div class="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/100 blur-2xl transition-all duration-500 group-hover:scale-250 group-hover:opacity-70" />
                <div class="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/100 blur-2xl transition-all duration-500 group-hover:scale-250 group-hover:opacity-70" />

                <div class="relative p-6">
                  <div class="absolute right-6 top-6">
                    <Icon icon="mdi:brain" class="h-10 w-10 text-indigo-500/90" />
                  </div>

                  <div class="flex items-center text-xl">
                    <span :class="{ 'text-white': !isDark }">OTHERS</span>
                  </div>

                  <div class="-mt-1">
                    <h3 class="text-sm font-semibold text-blue-500/80">More than 3 years</h3>
                  </div>

                  <div class="mt-6 flex items-center gap-4">
                    <div class="grid grid-cols-5 gap-2">
                      <div v-for="item in techList.other" :key="item.name" class="rounded-xl p-2">
                        <div class="flex items-center justify-center gap-3 cursor-pointer">
                          <Icon :icon="item.icon || 'solar:code-bold'" class="h-12 w-12 text-gray-500 transition-all duration-300 hover:brightness-150 hover:text-yellow-300 hover:scale-110" />
                        </div>
                        <p class="mt-1 text-[9px] text-slate-400 text-center">{{ item.name || '-' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <WorkExperience :is-dark="isDark" :data="techList" />
      </div>
    </main>

    <!-- FOOTER -->
    <section
      id="contact-section"
      class="min-h-[100vh] flex flex-col items-center justify-center bg-green-600 text-black relative p-5 overflow-hidden"
      style="background: linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%), url('https://assets.codepen.io/16327/noise-e82662fe.png'); background-blend-mode: color-dodge;"
    >
      <h2 class="split font-bold text-6xl md:text-7xl text-center">Get in Touch</h2>
      <p class="text-center max-w-xl">
        Although I’m not currently looking for any new opportunities, my inbox is always open.
        Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </p>

      <a
        href="mailto:olivaresmarkanthony14@gmail.com"
        class="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-12 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2 mt-6"
      >
        <span
          class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"
        ></span>

        <div class="flex items-center">
          <span class="ml-1 text-white">Say Hi!</span>
        </div>

        <div class="ml-2 flex items-center gap-1 text-sm md:flex">
          <Icon
            icon="mdi:hand-wave-outline"
            class="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-yellow-300 animate__animated animate__headShake animate__infinite"
          />
        </div>
      </a>

      <!-- ⭐ FOOTER ADDED HERE -->
      <p class="absolute bottom-4 text-sm text-black/70 font-medium text-center w-full">
        Designed &amp; Built by <span class="font-semibold text-black">Mark Anthony E. Olivares</span>
      </p>
    </section>


</div>
</template>
