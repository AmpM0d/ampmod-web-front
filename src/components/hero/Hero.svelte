<script>
    import appleCatIllustration from './apple-cat-hero.svg';
</script>

<div class="flex flex-col md:flex-row items-center justify-between bg-accent text-white font-bold py-12 px-4 md:px-[10%] shadow-xl">
    <div class="max-w-full md:max-w-[60%] flex flex-col gap-6">
        <div class="text-3xl md:text-4xl font-bold mb-2">
            Program anything.<br />
            <span class="text-white/80 text-3xl md:text-1xl">Low floor. Wide walls. <em>No</em> ceiling.</span>
        </div>
        <div class="flex flex-wrap gap-4 mt-2">
            <a href="https://ampmod.codeberg.page" class="px-6 py-3 text-lg font-bold rounded-lg shadow bg-white text-accent hover:bg-footer hover:text-accent-secondary transition-colors duration-200 hero-button create-button">Create</a>
            <a href="/join" class="px-6 py-3 text-lg font-bold rounded-lg border border-white bg-transparent text-white hover:border-accent-secondary transition-colors duration-200 hero-button join-button">Join</a>
            <a href="/about" class="px-6 py-3 text-lg font-bold rounded-lg border border-white bg-transparent text-white hover:border-accent-secondary transition-colors duration-200 hero-button join-button">About AmpMod</a>
        </div>
    </div>
    <div class="mt-8 md:mt-0 flex-shrink-0 hero-image">
        <img src={appleCatIllustration} alt="Illustration of Apple Cat dropping a array block into an input" class="h-[180px] md:h-[200px] drop-shadow-xl" draggable=false />
    </div>
</div>