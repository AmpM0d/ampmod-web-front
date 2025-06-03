<script lang="ts">
    export let id: number;
    export let title: string;
    export let author: string;
    export let thumbnailUrl: string;
</script>

<div class="project-card">
    <div class="thumbnail">
        <!-- TODO: Use real web-back data -->
        <a href={"/projects/" + id}><img src={"/ugctest.png"} alt={title} loading="lazy"></a>
    </div>
    <div class="details">
        <div class="project-title"><a href={"/projects/" + id} class="project-title" title={title}>{title}</a></div>
        <a href="/users/{author}" class="project-author">{author}</a>
    </div>
</div>

<style>
    .project-card {
        background-color: var(--footer-background);
        border-radius: 0.375rem;
        overflow: hidden;
        border: 1px solid var(--border-color);
        width: 12rem;
        flex-shrink: 0;
    }

    .thumbnail {
        aspect-ratio: 4 / 3;
    }

    .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: stretch;
    }

    .details {
        padding: 0.75rem;
    }

    .project-title {
        font-weight: 500;
        margin-bottom: 0.25rem;
        font-size: 1rem;
        color: var(--text-color);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-decoration: none;
    }

    .project-author {
        font-size: 0.875rem;
        color: var(--text-color);
        margin-bottom: 0.25rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-decoration: none;
    }
</style>