<script lang="ts">
    import { onMount } from 'svelte';
    import Spinner from "$components/spinner/Spinner.svelte";
    import Project from "$components/project/Project.svelte";

    export let title: string = 'Projects';

    interface ProjectType {
        id: number;
        title: string;
        author: string;
        thumbnailUrl: string;
    }

    let projects: ProjectType[] = [];
    let loading = true;
    let error: string | null = null;

    async function fetchProjects(): Promise<ProjectType[]> {
        // Fake API fetch with a fake delay
        return new Promise((resolve) => {
            setTimeout(() => {
                const fakeProjects: ProjectType[] = [
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
                <Project
                    id={project.id}
                    title={project.title}
                    author={project.author}
                    thumbnailUrl={project.thumbnailUrl}
                />
            {/each}
        </div>
    {:else}
        <p>No projects available.</p>
    {/if}
</div>

<style>
    .project-list {
        background-color: var(--background-color);
        color: var(--text-color);
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        font-family: var(--font-stack);
        margin: 10px auto;
        max-width: 900px;
    }

    h2 {
        margin: 0 0 0.75rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-color);
    }

    .projects-container {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        padding-bottom: 1rem;
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
