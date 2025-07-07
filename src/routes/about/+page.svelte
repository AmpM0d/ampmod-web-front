<script>
    import { onMount } from 'svelte';
    import appleCatIllustration from '../../components/hero/apple-cat-hero.svg';
    import { LibraryBig, BookOpenText, CodeIcon, MessagesSquare, Lightbulb, Newspaper } from '@lucide/svelte';
</script>

<style>
    .about-page {
        min-height: 100vh;
        font-family: var(--font-stack);
        margin-bottom: 2em;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        text-align: left;
        padding: 60px 130px;
        position: relative;
        overflow: hidden;
        color: white;
    }

    .gradient {
        background: linear-gradient(to bottom, var(--accent-color), var(--accent-color), transparent);
    }

    .header-text {
        flex: 1 1 0%;
        min-width: 0;
    }

    .header-text h1 {
        margin: 0;
        font-size: 3em;
        margin-bottom: 10px;
    }

    .header-text p {
        margin-bottom: 0;
        font-size: 1.15em;
    }

    .header-image-container {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: 32px;
    }

    .header-image {
        height: 150px;
        width: auto;
        margin: 0;
    }

    .sections {
        display: flex;
        flex-wrap: wrap;
    }

    .section {
        flex: 1 1 300px;
        padding: 30px;
    }

    .section h2 {
        color: var(--accent-color);
        font-size: 1.8em;
        margin-top: 0;
        margin-bottom: 15px;
    }

    .section p {
        line-height: 1.6;
        margin-bottom: 10px;
    }

    .call-to-action {
        text-align: center;
        max-width: 960px;
        margin: 0 auto;
    }

    .call-to-action h2 {
        color: var(--accent-color);
        font-size: 2em;
        margin-bottom: 20px;
    }

    .call-to-action-table {
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin: 40px auto 0 auto;
        max-width: 800px;
        align-items: stretch;
    }

    .call-to-action-row {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    .call-to-action-row .cta-btn {
        flex: 0 0 auto;
        min-width: 240px;
        margin-right: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: var(--accent-color);
        color: white;
        font-weight: bold;
        font-size: 1.15em;
        border-radius: 6px;
        padding: 14px 28px;
        text-decoration: none;
        transition: box-shadow 0.3s;
        gap: 8px;
    }

    .call-to-action-row .cta-btn:hover {
        box-shadow: 0 0 0 8px var(--accent-transparent);
    }

    .call-to-action-row .cta-desc {
        flex: 1 1 0%;
        font-size: 1.08em;
        line-height: 1.5;
        text-align: left;
    }

    @media (max-width: 700px) {
        .call-to-action-table {
            gap: 18px;
        }

        .call-to-action-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 14px 10px;
        }

        .call-to-action-row .cta-btn {
            width: 100%;
            justify-content: center;
        }

        .call-to-action-row .cta-desc {
            text-align: left;
        }
    }

    .cards {
        display: flex;
        justify-content: space-around;
        padding: 40px 20px;
        gap: 20px;
        max-width: 900px;
        margin: auto;
    }

    .card {
        flex: 1 1 30%;
        border-radius: 8px;
        padding: 10px 20px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
    }

    .card h3 {
        font-size: 1.5em;
        margin-bottom: 15px;
        text-transform: uppercase;
    }

    .card p {
        font-size: 1em;
        line-height: 1.6;
    }

    .card a {
        color: white;
        font-weight: bold;
    }

    @media (max-width: 900px) {
        header {
            flex-direction: column;
            text-align: center;
        }

        .header-image-container {
            margin-left: 0;
            margin-top: 20px;
            justify-content: center;
        }

        .header-text h1 {
            font-size: 2.5em;
        }

        .section {
            flex: 1 1 100%;
            border-right: none;
        }

        .cards {
            flex-direction: column;
            align-items: center;
        }

        .card {
            flex: 1 1 100%;
            max-width: 300px;
        }
    }
</style>

<div class="about-page">
    <div class="gradient">
        <header>
            <div class="header-text">
                <h1>Low floor. Wide walls. <em>No</em> ceiling.</h1>
                <p>AmpMod is a powerful Scratch 3.0 and TurboWarp modification that takes away most of the limitations of block-based programming.</p>
            </div>
            <div class="header-image-container">
                <img src={appleCatIllustration} alt="Illustration of Apple Cat" class="header-image" draggable="false" />
            </div>
        </header>
        <div class="cards">
            <div class="card">
                <h3>Advanced</h3>
                <p>AmpMod includes arrays, which are first class lists you can nest inside of each other. In addition, AmpMod includes over 100 extensions for you to use in your projects.</p>
                <p><b>AmpMod is more than a simple educational programming language.</b></p>
            </div>
            <div class="card">
                <h3>Open-source</h3>
                <p>AmpMod is entirely open-source under various licences, primarily the <a href="/gpl">GNU General Public Licence 3.0</a> and <a href="/mpl">Mozilla Public Licence 2.0</a>. It is free for both non-commercial and commercial use.</p>
                <p><b>We don't just allow contributions, we encourage them.</b></p>
            </div>
            <div class="card">
                <h3>Community-ran</h3>
                <p>AmpMod is ran entirely by a group of Scratchers who want an opportunity to use more advanced programming features in their projects. We also implement suggestions from the community.</p>
                <p><b>The future of AmpMod is in your own hands.</b></p>
            </div>
        </div>
    </div>
    <div class="call-to-action">
        <h2>Need Help?</h2>
        <div class="call-to-action-table">
            <div class="call-to-action-row">
                <a class="cta-btn" href="https://ampmod.miraheze.org" target="_blank" rel="noopener noreferrer"><LibraryBig /> Read the Wiki</a>
                <div class="cta-desc">The official AmpMod wiki includes guides, documentation, and other information for both new and experienced AmpModders. You can also help with the wiki by creating and editing pages!</div>
            </div>
            <div class="call-to-action-row">
                <a class="cta-btn" href="https://ampmod.flarum.cloud" target="_blank" rel="noopener noreferrer"><MessagesSquare /> Join the Forums</a>
                <div class="cta-desc">Join our forums to discuss features, get help, and connect with other contributors and users.</div>
            </div>
            <div class="call-to-action-row">
                <a class="cta-btn" href="https://ampmod.flarum.cloud/blog" target="_blank" rel="noopener noreferrer"><Newspaper /> Read the Blog</a>
                <div class="cta-desc">The AmpMod Blog is a sub-section of the AmpMod forums ran by the forum's admins and newswriters. New features and information on how to use them will be published on the blog.   </div>
            </div>
        </div>
    </div>
    <div class="call-to-action">
        <h2>Contribute to AmpMod!</h2>
        <div class="call-to-action-table">
            <div class="call-to-action-row">
                <a class="cta-btn" href="https://ampmod.codeberg.page/manual/dev" target="_blank" rel="noopener noreferrer"><BookOpenText /> Read Dev Docs</a>
                <div class="cta-desc">If you want to contribute to AmpMod, create extensions, or create your own fork of AmpMod, read the developer documentation to find out more!</div>
            </div>
            <div class="call-to-action-row">
                <a class="cta-btn" href="https://codeberg.org/ampmod" target="_blank" rel="noopener noreferrer"><CodeIcon /> Source Code</a>
                <div class="cta-desc">Browse the source code and submit pull requests on our Codeberg repositories. All contributions are welcome, and you may receive a badge on the forums for your contribution!</div>
            </div>
            <div class="call-to-action-row">
                <a class="cta-btn" href="https://ampmod.flarum.cloud/t/suggestions" target="_blank" rel="noopener noreferrer"><Lightbulb /> Suggest Features</a>
                <div class="cta-desc">Even if you don't know how to program in web technologies or use Git, you are welcome to make suggestions to improve AmpMod. </div>
            </div>
        </div>
    </div>
</div>