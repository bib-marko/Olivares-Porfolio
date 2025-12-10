<template>
<button
  class="relative flex items-center justify-center w-full max-w-52 h-12 px-4 py-2
         bg-black text-white rounded-md transition-all duration-300 overflow-hidden
         hover:ring-2 hover:ring-black hover:ring-offset-2 group"
  @click="open"
>
  <span
    class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10
           transition-all duration-1000 group-hover:-translate-x-40"
  ></span>

  <span>{{ label }}</span>

  <Icon :icon="icon" class="ml-2 h-5 w-5 text-gray-500 group-hover:text-yellow-300" />
</button>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface Props {
  email?: string;
  label?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  email: "",
  label: "Send Email",
  icon: "mdi:email-outline"
});

const open = () => {
  if (props.email) {
    window.location.href = `mailto:${props.email}`;
  }
};
</script>
