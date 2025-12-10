export function useShapes(count = 100) {
  const randomBetween = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const gradients = [
    "from-red-400 to-yellow-400",
    "from-blue-400 to-purple-500",
    "from-green-400 to-teal-500",
    "from-pink-400 to-rose-500",
    "from-indigo-400 to-blue-600",
    "from-orange-400 to-pink-500",
    "from-yellow-500 to-orange-500",
    "from-cyan-400 to-emerald-500",
    "from-fuchsia-400 to-violet-500",
    "from-lime-400 to-sky-500"
  ];

  const shapes = Array.from({ length: count }).map(() => ({
    size: randomBetween(350, 650),
    top: randomBetween(5, 85),
    left: randomBetween(5, 85),
    rounded: Math.random() > 0.5 ? "rounded-full" : "rounded-2xl",
    gradient: gradients[randomBetween(0, gradients.length - 1)]
  }));

  return { shapes };
}
