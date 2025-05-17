<script>
	import { username } from '$stores/session';
	import { goto } from '$app/navigation';
</script>

<div class="container">
	<div class="icon-container">
		<span>AM</span>
	</div>
	<h1 class="greeting">Hello, {$username}!</h1>
	<div class="navigation">
		<button class="nav-button rounded-left" on:click={() => goto('/')}>
			<span class="nav-icon"> c </span>
			<span class="nav-text">Create</span>
		</button>
		<button class="nav-button square" on:click={() => goto('/mystuff')}>
			<span class="nav-icon"> ms </span>
			<span class="nav-text">My Stuff</span>
		</button>
		<button class="nav-button rounded-right" on:click={() => goto(`/users/${$username}`)}>
			<span class="nav-icon"> p </span>
			<span class="nav-text">Profile</span>
		</button>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	}

	.icon-container {
		margin-bottom: 20px;
		width: 60px;
		height: 60px;
		border: 2px dotted #ccc; /* Dotted border for the square */
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5em;
		color: #777;
	}

	.greeting {
		font-size: 2em;
		font-weight: bold;
		margin-bottom: 30px;
	}

	.navigation {
		display: flex;
		gap: 10px; /* Reduced gap */
	}

	.nav-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 70px; /* Slightly reduced width to accommodate tighter gap */
		height: 70px; /* Slightly reduced height to match width */
		border: 1px solid #ccc;
		background-color: #f9f9f9;
		cursor: pointer;
		border-radius: 35px; /* Make them round */
	}

	.nav-button:active {
		background-color: #eee;
	}

	.rounded-left {
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.square {
		border-radius: 5px;
	}

	.rounded-right {
		border-top-right-radius: 50%;
		border-bottom-right-radius: 50%;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	.nav-icon {
		font-size: 1.5em;
		margin-bottom: 5px;
		color: #555;
	}

	.nav-text {
		font-size: 0.8em;
		color: #555;
	}
</style>
