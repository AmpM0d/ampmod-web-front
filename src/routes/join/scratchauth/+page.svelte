<svelte:head>
  <title>Join AmpMod</title>
</svelte:head>

<script lang="ts">
    import { onMount } from 'svelte';
	import { isLoggedIn } from '$stores/session';

    let username: string = '';
    let password: string = '';
    let confirmPassword: string = '';
    let email: string = '';

    const commonPasswords: string[] = ["123456", "password", "secret", "dragon", "ampmod", "ultiblocks",
        "letmein", "qwerty", "abc123", "monkey", "iloveyou", "123456789", "12345678", "incorrect"
    ];

    function isUsernameValidLength(name: string): boolean {
        return name.length >= 3 && name.length <= 20;
    }

    function doesUsernameContainValidChars(name: string): boolean {
        return /^[a-zA-Z0-9_-]+$/.test(name) || name == "";
    }

    function isUsernameNotTaken(name: string): boolean {
        return name.toLowerCase() !== 'ampelectrecuted'; // Replace with actual check
    }

    function isUsernameAppropriate(name: string): boolean {
        return !name.toLowerCase().includes('badusername'); // Replace with actual check
    }

    function isPasswordValidLength(pw: string): boolean {
        return pw.length >= 6;
    }

    function isPasswordNotCommon(pw: string): boolean {
        return !commonPasswords.includes(pw);
    }

    function handleJoin(): void {
        console.log({ email });
    }
</script>

<div class="join-form">
    {#if $isLoggedIn}
        You already seem to be logged into AmpMod.
    {:else}
        <h1>Finish registration</h1>
        <form on:submit|preventDefault={handleJoin}>
            <span>Your account is linked to your Scratch account, <b>username</b>, and will share a name with the account.
                If you want to change your AmpMod username, go to your account settings after joining.<br />
                By default, accounts created with Scratch do not have a password as you can login to them through your
                Scratch account - if you would like to add a password, you can do so in settings.</span>
            <div class="join-form-flex">
                <label for="email">Email (optional)</label>
                <input id="email" type="email" bind:value={email} />
            </div>
            <button type="submit">Join</button>
        </form>
    {/if}
</div>

<style>
    .join-form {
        max-width: 600px;
        margin: 64px auto;
        padding: 2rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-family: var(--font-stack);
    }

    .join-form h1 {
        text-align: center;
    }

    .join-form form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .join-form button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 8px;
        background-color: #59C059;
        color: white;
        cursor: pointer;
        font-weight: bold;
    }

    .join-form button:hover {
        background-color: #59a052;
    }

    .join-form .join-form-flex {
        display: flex;
        flex-direction: column;
    }

    .join-form label {
        margin-bottom: 0.5rem;
    }

    .join-form input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .requirements {
        margin-top: 0.25rem;
        padding-left: 1rem;
        color: #777;
        font-size: 0.9rem;
        list-style: none;
    }

    .requirements li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .error {
        color: red;
        margin-top: 0.25rem;
        font-size: 0.9rem;
    }

    .label-with-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .scratch-link {
        color: #855CD6;
        text-decoration: none;
        cursor: pointer;
        font-weight: bold;
    }
</style>