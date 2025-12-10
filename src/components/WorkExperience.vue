<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref<"work" | "education">("work");

// ---------------- DATA ----------------
const workExperience = [
  { role: "Senior Frontend Developer", company: "Megabet", date: "Current" },
  { role: "Fullstack Developer", company: "Leads Agricultural Products Corp.", date: "08/2023 – 05/2025" },
  { role: "Mid Vue Frontend Developer", company: "DreamPlay1 (Contract)", date: "07/2023 – 11/2025" },
  { role: "Fullstack Developer", company: "Dynamic Strategy Solutions Experts Corporation", date: "07/2022 – 07/2023" },
  { role: "Web Developer", company: "CDRRMO (Internship)", date: "02/2022 – 05/2022" }
];

const education = [
  { role: "Bachelor of Science in Information Technology", company: "University of Cabuyao", date: "06/2018 – 06/2022" },
  { role: "Fullstack Developer", company: "Asian Institute of Computer Studies", date: "06/2016 – 06/2018" }
];
</script>

<template>
  <div class="w-full flex flex-col items-center mt-8">

    <h2 class="text-4xl font-bold text-center">Qualification</h2>
    <h2 class="text-xl font-bold mb-16 text-center opacity-50">My Personal Journey</h2>

    <!-- ❗ BUTTONS KEPT EXACTLY AS YOU WANT -->
    <div class="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-black rounded-full p-2">
      <button
        :class="[
          'w-full flex gap-3 cursor-pointer text-white font-semibold px-7 py-3 rounded-full border border-gray-600 bg-gradient-to-r from-gray-800 to-black',
          activeTab === 'work'
            ? 'border-indigo-400 text-indigo-300'
            : 'hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900'
        ]"
        @click="activeTab = 'work'"
      >
        Work
      </button>

      <button
        :class="[
          'flex gap-3 cursor-pointer text-white font-semibold px-7 py-3 rounded-full border border-gray-600 bg-gradient-to-r from-gray-800 to-black',
          activeTab === 'education'
            ? 'border-indigo-400 text-indigo-300'
            : 'hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900'
        ]"
        @click="activeTab = 'education'"
      >
        Education
      </button>
    </div>

    <!-- TIMELINE RENDERING -->
    <div class="p-4 w-full md:max-w-3xl md:mx-auto">
      <div class="flex flex-col grid-cols-9 p-2 mx-auto md:grid">

        <template v-for="(item, index) in (activeTab === 'work' ? workExperience : education)" :key="index">

          <!-- LEFT SIDE -->
          <div
            v-if="index % 2 === 0"
            class="flex md:contents flex-row-reverse"
          >
            <div class="relative p-2 my-4 col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto">
              <h3 class="text-md font-semibold lg:text-lg">{{ item.role }}</h3>
              <p class="text-sm font-semibold lg:text-md">{{ item.company }}</p>
              <span class="absolute text-sm text-indigo-100/75 whitespace-nowrap">{{ item.date }}</span>
            </div>

            <div class="relative col-start-5 col-end-6 mr-7 md:mx-auto">
              <div class="flex items-center justify-center w-6 h-full">
                <div class="w-1 h-full bg-indigo-400 rounded-t-full"></div>
              </div>
              <div class="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
            </div>
          </div>

          <!-- RIGHT SIDE -->
          <div v-else class="flex md:contents">
            <div class="relative col-start-5 col-end-6 mr-7 md:mx-auto">
              <div class="flex items-center justify-center w-6 h-full">
                <div class="w-1 h-full bg-indigo-400 rounded-t-full"></div>
              </div>
              <div class="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
            </div>

            <div class="relative p-2 my-4 col-start-6 col-end-10 mr-auto">
              <h3 class="text-md font-semibold lg:text-lg">{{ item.role }}</h3>
              <p class="text-sm font-semibold lg:text-md">{{ item.company }}</p>
              <span class="absolute text-sm text-indigo-100/75 whitespace-nowrap">{{ item.date }}</span>
            </div>
          </div>

        </template>
      </div>
    </div>
  </div>
</template>
