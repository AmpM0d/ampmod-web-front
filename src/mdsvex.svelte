<script lang="ts">
    let { children, title, subtitle } = $props();
    import Banner from '$components/banner/Banner.svelte';
</script>

<Banner text={title} subtext={subtitle} />
<div class="mdsvex-page max-w-4xl m-auto mt-8">
    {@render children()}
</div>

<svelte:head>
    <title>{title} - AmpMod</title>
</svelte:head>

<style>
    /* Horizontal Rule */
    .mdsvex-page :global hr {
        margin: 2em 0;
        border: none;
        border-top: 1px solid var(--color-border); /* Use theme border color */
    }

    /* Links */
    .mdsvex-page :global a {
        color: var(--color-accent); /* Your accent color for links */
        text-decoration: none;
        transition: color 0.2s ease-in-out; /* Smooth hover effect */
    }

    .mdsvex-page :global a:hover {
        color: var(--color-accent-secondary); /* Slightly different accent on hover */
        text-decoration: underline;
    }

    /* Headings */
    .mdsvex-page :global h1,
    .mdsvex-page :global h2,
    .mdsvex-page :global h3,
    .mdsvex-page :global h4,
    .mdsvex-page :global h5,
    .mdsvex-page :global h6 {
        font-weight: 700; /* Bold headings */
        margin-top: 1.5em; /* Space above headings */
        margin-bottom: 0.8em; /* Space below headings */
        line-height: 1.2; /* Tighter line height for headings */
    }

    .mdsvex-page :global h1 {
        font-size: 2.5em; /* Larger for H1 */
    }

    .mdsvex-page :global h2 {
        font-size: 2em;
    }

    .mdsvex-page :global h3 {
        font-size: 1.75em;
    }

    .mdsvex-page :global h4 {
        font-size: 1.5em;
    }

    .mdsvex-page :global h5 {
        font-size: 1.25em;
    }

    .mdsvex-page :global h6 {
        font-size: 1em; /* Smallest heading, same as base text but bold */
    }

    /* Paragraphs */
    .mdsvex-page :global p {
        margin-bottom: 1em; /* Space between paragraphs */
    }

    /* Lists */
    .mdsvex-page :global ul,
    .mdsvex-page :global ol {
        margin-top: 1em;
        margin-bottom: 1em;
        padding-left: 2em; /* Indent lists */
    }

    .mdsvex-page :global ul {
        list-style-type: disc; /* Default bullet points */
    }

    .mdsvex-page :global ol {
        list-style-type: decimal; /* Default numbers */
    }

    .mdsvex-page :global li {
        margin-bottom: 0.5em; /* Space between list items */
    }

    /* Blockquotes */
    .mdsvex-page :global blockquote {
        margin: 1.5em 0;
        padding: 0.5em 1.5em;
        border-left: 4px solid var(--color-accent); /* Accent border */
        color: var(--color-text); /* Adjust color for quotes */
        font-style: italic;
        background-color: var(--color-background); /* Use theme background */
        opacity: 0.9; /* Slightly transparent background */
    }

    /* Inline Code */
    .mdsvex-page :global :not(pre) > code {
        font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace; /* Monospace font */
        background-color: rgba(0, 0, 0, 0.05); /* Light background for inline code */
        padding: 0.2em 0.4em;
        border-radius: 4px;
        font-size: 0.9em;
        color: var(--color-text); /* Code text color */
    }
    .dark .mdsvex-page :global :not(pre) > code {
        background-color: rgba(255, 255, 255, 0.1); /* Darker background for inline code in dark mode */
    }


    /* Code Blocks (pre) */
    .mdsvex-page :global pre {
        background-color: #2d2d2d; /* Dark background for code blocks */
        color: #f8f8f2; /* Light text for code blocks */
        padding: 1em;
        border-radius: 8px;
        overflow-x: auto; /* Enable horizontal scrolling for long lines */
        font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace; /* Monospace font */
        font-size: 0.95em;
        margin-bottom: 1em;
    }

    .mdsvex-page :global pre code {
        background-color: transparent; /* Don't apply inline code background to code blocks */
        padding: 0;
        border-radius: 0;
        font-size: inherit;
        color: inherit;
    }

    /* Tables */
    .mdsvex-page :global table {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5em 0;
    }

    .mdsvex-page :global th,
    .mdsvex-page :global td {
        border: 1px solid var(--color-border); /* Border for table cells */
        padding: 0.8em;
        text-align: left;
    }

    .mdsvex-page :global th {
        background-color: var(--color-background); /* Slightly different background for headers */
        font-weight: 600;
    }
    .dark .mdsvex-page :global th {
        background-color: var(--color-footer-dark); /* Darker background for headers in dark mode */
    }
</style>
