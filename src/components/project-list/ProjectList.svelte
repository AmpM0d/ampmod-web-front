<script lang="ts">
    import { onMount } from 'svelte';
    import Spinner from "$components/spinner/Spinner.svelte";

    export let title: string = 'Projects';

    interface Project {
        id: number;
        title: string;
        author: string;
        thumbnailUrl: string;
    }

    let projects: Project[] = [];
    let loading = true;
    let error: string | null = null;

    async function fetchProjects(): Promise<Project[]> {
        // Fake API fetch with a fake delay
        return new Promise((resolve) => {
            setTimeout(() => {
                const fakeProjects: Project[] = [
                    {
                        id: 1,
                        title: 'NYAN CAT DOGEING GAME',
                        author: 'COYOTITDOG',
                        thumbnailUrl: 'https://via.placeholder.com/150/FF69B4/FFFFFF?Text=NyanCat',
                    },
                    {
                        id: 2,
                        title: 'pang does a flip v2',
                        author: 'pang',
                        thumbnailUrl: 'https://via.placeholder.com/150/ADD8E6/000000?Text=PangFlip',
                    },
                    {
                        id: 3,
                        title: '&1& 1.0',
                        author: '1',
                        thumbnailUrl: 'https://via.placeholder.com/150/90EE90/FFFFFF?Text=And1',
                    },
                    {
                        id: 4,
                        title: 'Ultimate Sandra Ve...',
                        author: 'mira',
                        thumbnailUrl: 'https://via.placeholder.com/150/FFFF00/000000?Text=Sandra',
                    },
                    {
                        id: 777,
                        title: 'NYAN CAT DOGEING GAME',
                        author: 'COYOTITDOG',
                        thumbnailUrl: 'https://via.placeholder.com/150/FF69B4/FFFFFF?Text=NyanCat',
                    },
                    {
                        id: 7476,
                        title: 'pang does a flip v2',
                        author: 'pang',
                        thumbnailUrl: 'https://via.placeholder.com/150/ADD8E6/000000?Text=PangFlip',
                    },
                    {
                        id: 111,
                        title: '&1& 1.0',
                        author: '1',
                        thumbnailUrl: 'https://via.placeholder.com/150/90EE90/FFFFFF?Text=And1',
                    },
                    {
                        id: 123,
                        title: 'Ultimate Sandra Ve...',
                        author: 'mira',
                        thumbnailUrl: 'https://via.placeholder.com/150/FFFF00/000000?Text=Sandra',
                    },
                ];
                resolve(fakeProjects);
            }, 1500); // Fake 1.5 second delay
        });
    }

    onMount(async () => {
        try {
            projects = await fetchProjects();
            loading = false;
        } catch (err) {
            error = 'Failed to load projects.';
            loading = false;
            console.error(err);
        }
    });
</script>

<div class="project-list">
    <h2>{title}</h2>
    {#if loading}
        <div class="loading">
            <Spinner />
            <p>Loading projects...</p>
        </div>
    {:else if error}
        <p class="error">{error}</p>
    {:else if projects.length > 0}
        <div class="projects-container">
            {#each projects as project (project.id)}
                <div class="project-card">
                    <div class="thumbnail">
                        <img src={project.thumbnailUrl} alt={project.title} loading="lazy">
                    </div>
                    <div class="details">
                        <div class="project-title">{project.title}</div>
                        <a href="/users/{project.author}" class="project-author">{project.author}</a>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p>No projects available.</p>
    {/if}
</div>

<style>
    .project-list {
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #dcdcdc;
        background-color: #ffffff;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        margin: 10px auto;
        max-width: 900px;
    }

    h2 {
        margin: 0 0 0.75rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #333333;
    }

    .projects-container {
        display: flex; /* Use flexbox for horizontal scrolling */
        gap: 1rem;
        overflow-x: auto; /* Enable horizontal scrolling */
        padding-bottom: 1rem; /* Add some padding for scrollbar */
    }

    .project-card {
        background-color: #f9f9f9;
        border-radius: 0.375rem;
        overflow: hidden;
        border: 1px solid #e0e0e0;
        width: 12rem; /* Set a fixed width for each card */
        flex-shrink: 0; /* Prevent cards from shrinking */
    }

    .thumbnail {
        aspect-ratio: 4 / 3;
        background-color: #e0e0e0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .details {
        padding: 0.75rem;
    }

    .project-title {
        font-weight: 500;
        margin-bottom: 0.25rem;
        font-size: 1rem;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .project-author {
        font-size: 0.875rem;
        color: #444;
        margin-bottom: 0.25rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-decoration: none;
    }

    .error {
        color: #ff4d4d;
        font-size: 0.875rem;
        text-align: center;
    }

    .loading {
        text-align: center;
        font-size: 0.875rem;
    }
</style>
