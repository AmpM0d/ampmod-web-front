<script>
    export let colour = "var(--spinner-color)";
</script>

<style>
    .spinner {
        border: 4px solid transparent;
        border-color: var(--spinner-custom-color) transparent var(--spinner-custom-color) transparent;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: auto;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>

<div
    class="spinner"
    style="--spinner-custom-color: {colour};"
    aria-label="Loading"
></div>