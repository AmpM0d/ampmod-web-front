<style>
    .spinner {
        border: 4px solid transparent;
        border-color: #59C059 transparent #59C059 transparent;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: auto;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>

<div
    class="spinner"
    aria-label="Loading"
></div>