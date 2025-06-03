<script lang="ts">
    import DOMPurify from 'dompurify';

    export let id: string;
    export let description: string;
    export let defaultText: string;
    export let links: string[] = [];

    import { translations } from '$lib/translations/translations.json';

    // Mock translation function (replace with actual implementation)
    function translate(id: string, defaultText: string): string {
        // hold on
    }

    // Replace placeholders like <a>...</a> with actual links
    function formatText(text: string, links: string[]): string {
        let linkIndex = 0;
        return text.replace(/<a>(.*?)<\/a>/g, (match, content) => {
            const link = links[linkIndex++] || "#";
            return `<a href="${link}">${content}</a>`;
        });
    }

    $: translatedText = translate(id, defaultText);
    $: formattedText = formatText(translatedText, links);
    $: sanitizedText = DOMPurify.sanitize(formattedText);
</script>

{@html sanitizedText}