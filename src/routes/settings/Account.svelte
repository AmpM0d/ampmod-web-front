<script>
    import { Cctv } from '@lucide/svelte';
</script>
<style>
    .account-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .account-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background-color: var(--footer-background);
        transition: background-color 0.3s;
    }

    .account-item:hover {
        background-color: rgba(89, 192, 89, 0.07);
    }

    .account-item span {
        font-weight: bold;
    }

    .link-button {
        padding: 5px 10px;
        font-size: 0.9rem;
        color: white;
        background-color: var(--accent-color);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
    }

    .link-button:hover {
        background-color: #45a045;
    }
</style>

<div class="linked-accounts">
    <h3>Linked Accounts</h3>
    <ul class="account-list">
        <li class="account-item">
            <span>Scratch</span>
            <a href="#" class="link-button">Link</a>
        </li>
        <li class="account-item">
            <span>Codeberg</span>
            <a href="#" class="link-button">Link</a>
        </li>
        <li class="account-item">
            <span>GitHub</span>
            <a href="#" class="link-button">Link</a>
        </li>
        <li class="account-item">
            <span>AmpMod Wiki</span>
            <a href="#" class="link-button">Link</a>
        </li>
        <li class="account-item">
            <span>AmpMod Forums</span>
            <a href="#" class="link-button">Link</a>
        </li>
    </ul>
</div>

<h3>Account Standing</h3>
<i><Cctv size=16 /> The AmpMod website is moderated to ensure that projects follow our <a href="/proj-guidelines">guidelines</a>.
    If you violate the guidelines, your account's reputation can be lowered.</i>