<script lang="ts">
    import { page } from '$app/state';
    import Minigame from '$components/minigame/Minigame.svelte';
    // A mapping of common HTTP status codes to human-readable descriptions
    const statusDescriptions: Record<number, string> = {
        400: "Bad Request. The server could not understand the request.",
        401: "Authentication is required and has failed or has not been provided.",
        403: "You do not have permission to access this resource.",
        404: "The requested resource could not be found.",
        405: "The HTTP method is not supported for this resource.",
        406: "The requested resource is capable of generating only content not acceptable.",
        407: "Authentication with the proxy is required.",
        408: "The server timed out waiting for the request.",
        409: "The request could not be completed due to a conflict.",
        410: "The resource is no longer available and will not be available again.",
        411: "The request did not specify the length of its content.",
        412: "The server does not meet one of the preconditions.",
        413: "The request is larger than the server is willing to process.",
        414: "The URI provided was too long for the server to process.",
        415: "The media format is not supported by the server.",
        416: "The range specified is not valid for the resource.",
        417: "The server cannot meet the requirements of the Expect header.",
        418: "The teapot refuses to brew coffee.",
        429: "You have sent too many requests in a given amount of time.",
        500: "An error occured on the server's side.",
        501: "The server does not support the functionality required.",
        502: "The server received an invalid response from the upstream server.",
        503: "The server is currently unable to handle the request.",
        504: "The server did not receive a timely response from the upstream server.",
        505: "The server does not support the HTTP protocol version."
    };

    // Fallback description if the status code is not in the mapping
    const description = statusDescriptions[page.status] || "An unexpected error occurred.";
</script>

<style>
    .error-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 8em;
        text-align: center;
        font-family: var(--font-stack);
    }

    .status {
        font-size: 5rem;
        font-weight: bold;
        color: #ff6b6b;
    }

    .description {
        font-size: 1.5rem;
        margin-top: 1rem;
        color: #333;
    }
</style>

<div class="error-page">
    {#if page.status == 404}
    <Minigame />
    {:else}
    <div class="status">{page.status}</div>
    {/if}
    <div class="description">{description}</div>
    <p><a href="/">Home</a></p>
</div>