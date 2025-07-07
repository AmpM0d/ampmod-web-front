<script lang="ts">
    let searchQuery = '';
    import Logo from './logo.svg';
    import { isLoggedIn, username } from '$stores/session';
    import { Mail, FolderOpen, ChevronDown, Sun, Moon, MenuIcon } from '@lucide/svelte';
    import { theme } from '$stores/theme';
    import { fade } from 'svelte/transition';

    let isProfileOpen = false;
    let isMenuOpen = false;

    // Use a click outside listener for dropdowns for better UX
    import { onMount } from 'svelte';

    function toggleProfile() {
        isProfileOpen = !isProfileOpen;
    }

    function closeProfile() {
        isProfileOpen = false;
    }

    function toggleTheme() {
        theme.update(current => (current === 'light' ? 'dark' : 'light'));
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    // New: Handle clicks outside of dropdowns/menus to close them
    onMount(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isProfileOpen && !event.composedPath().some(el => (el as HTMLElement).closest('.profile-dropdown'))) {
                closeProfile();
            }
            if (isMenuOpen && !event.composedPath().some(el => (el as HTMLElement).closest('.hamburger-container'))) {
                toggleMenu(); // This will close it if already open
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<style>
    button { margin: 0; }
    header {
        display: flex;
        justify-content: space-between; /* Changed from center */
        align-items: center;
        height: 50px;
        background: var(--accent-color);
        color: white;
        font-family: var(--font-stack);
        font-size: 14px;
        position: fixed;
        width: 100%;
        top: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        padding: 0 10px; /* Add some padding on the sides for smaller screens */
        box-sizing: border-box; /* Include padding in the element's total width/height */
        z-index: 10;
    }

    button {
        cursor: pointer;
        background: none;
        border: none;
        text-align: left;
        font-family: inherit;
        font-size: inherit;
        color: inherit; /* Ensure button text/icons inherit color */
    }

    nav {
        display: flex;
        align-items: center;
        /* Use gap for spacing between nav items, but more flexible for small screens */
        gap: 8px; /* Default gap */
    }

    .header-link {
        all: unset;
        color: white;
        text-decoration: none;
        font-weight: bold;
        padding: 0.75em;
        border-radius: 4px;
        cursor: pointer;
        white-space: nowrap; /* Prevent links from breaking into multiple lines */
    }
    
    .header-image-link {
        height: 24px;
        padding: 4px 8px;
        transition: transform 0.1s;
        /* Make icon buttons touch-friendly */
        min-width: 44px; /* Ensure a minimum touch target size */
        min-height: 44px;
        display: inline-flex; /* Use flex to center icon if it's the only content */
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .header-image-link:hover {
        transform: scale(1.2);
    }

    .header-link:not(.header-image-link):hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .search-bar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .search-bar input {
        padding: 0.6em 1em;
        outline: none;
        border: none;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.1);
        width: 100%; /* Make it fluid by default */
        max-width: 200px; /* Sensible max-width for smaller screens */
        color: white;
        transition: background 0.3s, color 0.3s, box-shadow 0.2s;
    }

    .search-bar input:focus {
        background: white;
        color: black;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }

    .search-bar input::placeholder {
        opacity: 0.7;
    }

    .search-bar-mobile input {
        padding: 0.1em 1em;
        outline: none;
        border: none;
        border-radius: 4px;
        background: transparent;
        color: white;
        transition: background 0.3s, color 0.3s, box-shadow 0.2s;
		text-align: center;
    }

    .search-bar-mobile input:focus {
        background: white;
        color: black;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }	

    .header-overlay-hack {
        margin-top: 50px;
    }

    .logo-link {
        display: flex; /* Ensure logo is centered if it's the only element in its container */
        align-items: center;
        margin-right: 10px; /* Space between logo and other elements */
    }

    .logo {
        transition: transform 0.1s;
        height: 28px;
        flex-shrink: 0; /* Prevent logo from shrinking */
    }

    .logo-link:hover .logo {
        transform: scale(1.05);
    }

    .profile-dropdown {
        position: relative;
        /* Ensure dropdown doesn't affect layout much on small screens if it expands */
        flex-shrink: 0; /* Prevent profile button from shrinking */
    }

    .profile-button {
        background: none;
        border: none;
        color: white;
        font-weight: bold;
        cursor: pointer;
        padding: 0.75em 0.75em;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 5px;
        box-sizing: border-box;
    }

    .profile-button:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .profile-options {
        display: block;
        position: absolute;
        top: calc(100% + 7px);
        right: 0;
        background: var(--accent-color);
        color: white;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-top: none;
        border-radius: 0 0 4px 4px;
        z-index: 15;
        width: 12em; /* Default width */
        max-width: 90vw; /* Prevent overflow on very small screens */
        overflow: hidden;
        box-sizing: border-box;
        text-align: left; /* Ensure text is left-aligned within dropdown */
    }

    .profile-options a, .profile-options button {
        display: block;
        padding: 0.6em 1em;
        text-decoration: none;
        color: white;
        font-weight: bold;
        width: 100%;
        box-sizing: border-box; /* Include padding in width */
    }

    .profile-options a:hover, .profile-options button:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    .profile-options hr {
        margin: 0;
        border: none;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
    }

    /* New container for the hamburger menu to fix its positioning */
    .hamburger-container {
        position: relative; /* For positioning the menu relative to this container */
        display: none; /* Hidden by default */
    }

    .hamburger-menu {
        position: absolute;
        top: calc(100% + 7px); /* Position it relative to its button */
        left: 0; /* Align left with the button */
        background: var(--accent-color);
        color: white;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        z-index: 15;
        width: 12em;
        max-width: 90vw; /* Prevent overflow on very small screens */
        overflow: hidden;
        box-sizing: border-box;
    }

    .hamburger-menu a {
        display: block;
        padding: 0.6em 1em;
        text-decoration: none;
        color: white;
        font-weight: bold;
    }

    .hamburger-menu a:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    .hamburger-button {
        display: none; /* Hidden by default, shown by media query */
        background: none;
        border: none;
        color: white;
        font-size: 1.5em; /* Adjust icon size */
        cursor: pointer;
        /* Positioned inside the flex container, no absolute positioning needed here */
        padding: 0.75em; /* Add padding for better touch target */
        box-sizing: border-box;
        min-width: 44px; /* Touch target */
        min-height: 44px;
        display: flex; /* To center the icon */
        justify-content: center;
        align-items: center;
    }

    /* Media Queries for Responsiveness */

    /* Small Mobile (e.g., up to 480px wide) */
    @media (max-width: 480px) {
        header {
            padding: 0 5px; /* Even less padding on very small screens */
            justify-content: space-between; /* Space out elements */
        }

        .logo-link {
             margin-right: 5px; /* Reduce space next to logo */
        }

        .search-bar {
            flex-grow: 1; /* Allow search bar to take available space */
            margin-right: 5px; /* Space between search and right-side elements */
        }

        .search-bar input {
            padding: 0.5em 0.8em; /* Slightly smaller padding */
            font-size: 0.9em; /* Smaller font size */
        }

        /* Ensure profile and login/join buttons are compact */
        .profile-button,
        .header-link:not(.header-image-link) {
            padding: 0.5em 0.6em;
            font-size: 0.9em;
        }

        .profile-dropdown,
        .hamburger-container {
            position: static; /* Let them flow normally to occupy space */
            margin-left: auto; /* Push them to the right */
        }

        .profile-options,
        .hamburger-menu {
            /* Full width dropdowns/menus for small screens */
            width: 100vw; /* Take full viewport width */
            max-width: unset; /* Remove max-width constraint */
            left: 0; /* Align to left edge of viewport */
            right: auto; /* Override right: 0 */
            top: 50px; /* Position right below the header */
            border-radius: 0; /* No rounded corners for full-width overlay */
            border-left: none;
            border-right: none;
        }

        .header-image-link {
            min-width: 38px; /* Slightly smaller touch target if needed for space */
            min-height: 38px;
            padding: 2px 4px;
        }
    }

    /* Tablets and small desktops (e.g., from 481px to 900px wide) */
    @media (min-width: 481px) and (max-width: 900px) {
        header {
            padding: 0 15px; /* More padding */
        }
        
        .search-bar input {
            width: 30vw; /* Adjust width for slightly larger screens */
            max-width: 300px; /* Add a max-width to prevent it from getting too wide */
        }

        /* The original rule was max-width: 900px for these. Keep them here, but improve */
        nav > .nomobile {
             display: none; /* Hide regular nav links */
        }

        .hamburger-button {
            display: block; /* Show hamburger */
            order: -1; /* Place it at the beginning */
            margin-right: 10px; /* Space between hamburger and logo */
        }

        .hamburger-container {
            display: block; /* Show the container for the hamburger menu */
            position: absolute; /* Re-position its container for menu display */
            left: 10px; /* Align to the left side */
            top: 0; /* Align to the top of the header */
            height: 100%; /* Take full height of header for vertical alignment */
            display: flex; /* Use flex to align button */
            align-items: center;
            z-index: 100; /* Ensure button is clickable above other elements */
        }
        
        /* Adjust hamburger menu position relative to its new container */
        .hamburger-menu {
            top: calc(100% + 7px);
            left: 0;
            width: 15em; /* Slightly larger width for tablet menu */
            max-width: 80vw; /* Responsive max width */
        }

        /* Re-center the main content of the header if needed for aesthetics */
        header nav {
             flex-grow: 1; /* Allow navigation to take remaining space */
             justify-content: flex-end; /* Push elements to the right */
        }

        header .logo-link {
            position: absolute; /* Take logo out of flex flow to center it */
            left: 50%;
            transform: translateX(-50%);
        }
    }

    /* Desktops (e.g., from 901px upwards) */
    @media (min-width: 901px) {
        header {
            justify-content: center; /* Center content on larger screens */
            gap: 20px; /* More space between main sections */
            padding: 0 20px;
        }
        
        header nav {
            gap: 15px; /* Larger gap for nav items */
        }

        .hamburger-button,
        .hamburger-container {
            display: none; /* Hide hamburger menu on larger screens */
        }

        nav > .nomobile {
            display: flex; /* Show regular nav links */
            gap: 8px; /* Gap for these specific links */
        }

        .search-bar input {
            width: 25em; /* Wider search bar */
            max-width: 400px; /* Ensure it doesn't get ridiculously wide */
        }

        .profile-options {
            width: 15em; /* Wider profile dropdown */
            max-width: unset; /* No max width needed */
        }
    }
</style>

<header>
    <div class="hamburger-container">
        <button class="hamburger-button" on:click={toggleMenu} aria-expanded={isMenuOpen} aria-controls="main-menu">
            <MenuIcon />
        </button>
        {#if isMenuOpen}
            <div class="hamburger-menu" transition:fade={{ duration: 100 }} id="main-menu">
                <a href="https://ampmod.codeberg.page/editor.html" on:click={toggleMenu}>Create</a>
                <a href="https://ampmod.codeberg.page/credits.html" on:click={toggleMenu}>Credits</a>
                <a href="https://ampmod.flarum.cloud" on:click={toggleMenu}>Discuss</a>
                <a href="https://codeberg.org/AmpMod" on:click={toggleMenu}>Contribute</a>
				<div class="search-bar-mobile" style="width: 100%; margin: 4px;">
					<input
						type="text"
						placeholder="Search for projects..."
						bind:value={searchQuery}
						aria-label="Search for projects"
					/>
				</div>
			</div>
        {/if}
    </div>

    <a href="/" class="logo-link">
        <img src={Logo} draggable=false height=28 alt="AmpMod" class="logo">
    </a>
    
    <nav>
        <div class="nomobile">
            <a href="https://ampmod.codeberg.page/editor.html" class="header-link">Create</a>
            <a href="https://ampmod.codeberg.page/credits.html" class="header-link">Credits</a>
            <a href="https://ampmod.flarum.cloud" class="header-link">Discuss</a>
            <a href="https://codeberg.org/AmpMod" class="header-link">Contribute</a>
        </div>
        
        <div class="search-bar nomobile">
            <input
                type="text"
                placeholder="Search for projects..."
                bind:value={searchQuery}
                aria-label="Search for projects"
            />
        </div>
        
        {#if $isLoggedIn}
            <a href="/messages" class="header-link header-image-link" title="Messages" aria-label="Messages"><Mail /></a>
            <a href="/mystuff" class="header-link header-image-link" title="My Stuff" aria-label="My Stuff"><FolderOpen /></a>
            <div class="profile-dropdown">
                <button class="profile-button" on:click={toggleProfile} aria-expanded={isProfileOpen} aria-controls="profile-menu">
                    {$username} <ChevronDown size=16 />
                </button>
                {#if isProfileOpen}
                    <div class="profile-options" transition:fade={{ duration: 100 }} id="profile-menu">
                        <a href={`/users/${$username}`} on:click={closeProfile}>Profile</a>
                        <a href="/mystuff" on:click={closeProfile}>My Stuff</a>
                        <a href="/settings" on:click={closeProfile}>Settings</a>
                        <hr>
                        <button on:click={toggleTheme}>{#if $theme == "dark"}Light{:else}Dark{/if} Theme</button>
                        <a href="/logout" on:click={closeProfile}>Log Out</a>
                    </div>
                {/if}
            </div>
        {:else}
            <button class="header-link header-image-link" on:click={toggleTheme} tabindex="0" aria-label="Toggle theme">
                {#if $theme == "dark"}<Sun fill="currentColor" />{:else}<Moon fill="currentColor" />{/if}
            </button>
            <a href="/join" class="header-link">Join</a>
            <a href="/login" class="header-link">Log in</a>
        {/if}
    </nav>
</header>
<div class="header-overlay-hack"></div>