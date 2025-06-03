<script lang="ts">
import { isLoggedIn } from '$stores/session';
import { goto } from '$app/navigation';
function handleDeleteAccount(event: { preventDefault: () => void; target: { password: { value: any; }; }; }) {
    event.preventDefault();
    const confirmation = prompt("Please remember - if you proceed to delete your account, it will be permanently deleted. All projects and other data will be inaccessible. Are you REALLY, REALLY sure? Please type the following: 'Please just do it, server!' to confirm.");
    if (confirmation?.toLocaleLowerCase().replaceAll(' ', '').replaceAll('!', '').replaceAll(',', '') === 'pleasejustdoitserver') {
        // Proceed with account deletion
        // FAKE LOGIC
        alert("Account deletion complete. Carry on with your day.")
        $isLoggedIn = false;
        goto('/');
    }
}
</script>

<h3>Change Username</h3>
<p>Your old username will redirect to your new username until it is taken by someone else.</p>
<form method="POST">
    <input type="text" name="username" placeholder="New Username" required>
    <button type="submit">Change Username</button>
</form>

<h3>Delete Account</h3>
<strong>This will PERMANENTLY delete your account, including your profile, your projects, and any other data.
    Note that moderators can still see your account and other data. If you are requesting deletion for privacy
    reasons, please contact us at [TODO: fill this in].</strong>
<p>To delete your account, please enter your password:</p>
<form method="POST" on:submit={handleDeleteAccount}>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Delete Account</button>
</form>