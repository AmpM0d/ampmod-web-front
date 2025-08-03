<script>
    import appleCatIllustration from './apple-cat-hero.svg';
    import { Clapperboard, Sparkles, Info } from '@lucide/svelte';
</script>

<div class="flex flex-col md:flex-row items-center justify-between bg-accent-secondary text-white font-bold py-12 px-4 md:px-[10%] shadow-xl">
    <div class="max-w-full md:max-w-[60%] flex flex-col gap-6">
        <div class="text-3xl md:text-4xl font-bold mb-2">
            Program anything<br />
            <span class="text-white/80 text-3xl md:text-1xl">Low floor. Wide walls. <em>No</em> ceiling.</span>
        </div>
        <div class="flex flex-wrap gap-4 mt-2">
            <a href="https://ampmod.codeberg.page" class="px-6 py-2 text-xl font-black rounded-xl shadow bg-white text-accent-secondary hover:bg-footer hover:text-green-800 transition-colors duration-200 hero-button create-button flex items-center gap-2"><Clapperboard /> Try it out</a>
            <a href="/join" class="px-6 py-2 text-lg font-bold rounded-xl border border-white bg-transparent text-white hover:border-accent transition-colors duration-200 hero-button join-button flex items-center gap-2"><Sparkles /> Join</a>
            <a href="/about" class="px-6 py-2 text-lg font-bold rounded-xl border border-white bg-transparent text-white hover:border-accent transition-colors duration-200 hero-button join-button flex items-center gap-2"><Info /> About AmpMod</a>
        </div>
    </div>
    <div class="mt-8 md:mt-0 flex-shrink-0 hero-image">
        <img src={appleCatIllustration} alt="Illustration of Apple Cat dropping a array block into an input" class="h-[180px] md:h-[200px] drop-shadow-xl" draggable=false />
    </div>
</div>