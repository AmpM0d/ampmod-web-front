<script>
    import appleCatIllustration from './apple-cat-rankup.svg';
    import { Clapperboard, Sparkles, Info } from '@lucide/svelte';
</script>


<section class="relative flex flex-col md:flex-row items-center justify-between bg-[#4D97FF] text-white font-bold py-16 px-4 md:px-[10%] overflow-hidden shadow-xl">
    <!-- Floating shapes -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div class="absolute top-8 left-8 w-16 h-16 bg-yellow-400 rounded-full shadow-lg opacity-80 animate-float" style="animation-delay:0s"></div>
        <div class="absolute top-24 right-16 w-20 h-8 bg-green-400 rounded-xl shadow-lg opacity-80 animate-float" style="animation-delay:.5s"></div>
        <div class="absolute bottom-12 left-24 w-12 h-12 bg-purple-400 rounded-lg shadow-lg opacity-80 animate-float" style="animation-delay:1s"></div>
        <div class="absolute bottom-8 right-32 w-16 h-16 bg-orange-400 rounded-full shadow-lg opacity-80 animate-float" style="animation-delay:1.5s"></div>
        <div class="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full shadow-lg opacity-40 animate-float" style="animation-delay:2s"></div>
    </div>

    <div class="relative z-10 w-full md:w-2/3 flex flex-col items-center md:items-start gap-8 text-center md:text-left">
        <h1 class="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            The new AmpMod is here!
        </h1>

        <div class="flex flex-wrap gap-4 justify-center md:justify-start mt-2">
            <a
                href="https://ampmod.codeberg.page"
                class="px-8 py-4 text-xl font-black rounded-2xl shadow-lg bg-orange-400 text-white hover:bg-orange-500 transition-colors duration-200 flex items-center gap-2"
                aria-label="Start Creating"
            >
                <Clapperboard /> Start Creating
            </a>

            <a
                href="/join"
                class="px-8 py-4 text-xl font-bold rounded-2xl border-2 border-white bg-transparent text-white hover:border-yellow-400 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2"
                aria-label="Join AmpMod"
            >
                <Sparkles /> Join
            </a>

            <a
                href="/about"
                class="px-8 py-4 text-xl font-bold rounded-2xl border-2 border-white bg-transparent text-white hover:border-green-400 hover:text-green-300 transition-colors duration-200 flex items-center gap-2"
                aria-label="Learn more about AmpMod"
            >
                <Info /> About
            </a>
        </div>
    </div>

    <div class="relative z-10 mt-12 md:mt-0 flex-shrink-0 flex justify-center items-center">
        <img
            src={appleCatIllustration}
            alt="Apple Cat dropping an array block into an input field"
            class="h-[200px] md:h-[260px]"
            draggable={false}
        />
    </div>
</section>

<style>
    @keyframes float {
        0% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-16px) scale(1.05); }
        100% { transform: translateY(0) scale(1); }
    }
    .animate-float {
        animation: float 4s ease-in-out infinite;
    }
</style>
