<script lang="ts">
	const communityLinks = [
		{ text: 'Discussion Forums', href: 'https://ampmod.flarum.cloud' },
		{ text: 'Statistics', href: '#' }, // Replace with actual link
	];

	const resourcesLinks = [
		{ text: 'About', href: '/about' },
		{ text: 'AmpMod Wiki', href: 'https://ampmod.miraheze.org/' },
		{ text: 'Source code', href: 'https://codeberg.org/AmpMod' },
		{ text: 'Dev docs', href: 'https://codeberg.org/AmpMod/dev-docs/wiki' },
		{ text: 'FAQ', href: '#' },
		{ text: 'Mirrors', href: '/mirrors'}
	];

	const rulesLinks = [
		{ text: 'Uploading Guidelines', href: '/proj-guidelines' },
		{ text: 'Terms of Use', href: '/terms' },
		{ text: 'Privacy Policy', href: '#' }, // Replace with actual link
	];

	const donateLinks = [
		{ text: 'Donate to TurboWarp', href: 'https://github.com/sponsors/GarboMuffin' },
		{ text: 'Donate to Scratch', href: 'https://www.scratchfoundation.org/donate' },
	];
</script>

<style>
	footer {
		background-color: #f0f0f0;
		padding: 20px;
		color: #333;
		font-size: 0.9em;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center; /* Center items horizontally within the footer */
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	}

	.footer-columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 20px;
		margin-bottom: 20px;
		max-width: 900px;
		width: 100%; /* Ensure the grid takes full width of the centered container */
	}

	.footer-column h4 {
		margin-top: 0;
		margin-bottom: 10px;
		color: #555;
		font-weight: bold;
	}

	.footer-column ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-column li {
		margin-bottom: 5px;
	}

	.footer-column a {
		color: #28852b;
		text-decoration: none;
	}

	.footer-column a:hover {
		text-decoration: underline;
	}

	.language-select {
		display: flex;
		justify-content: center;
		margin-bottom: 15px;
		width: 100%; /* Ensure the select takes full width of the centered container */
		max-width: 300px; /* Optional: Limit the maximum width of the select */
	}

	select {
		padding: 8px 12px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: white;
		color: #333;
		font-size: 0.9em;
		cursor: pointer;
		width: 100%; /* Make the select fill its container */
	}

	.disclaimer {
		text-align: center;
		margin-top: 15px;
		color: #777;
		font-size: 0.8em;
		line-height: 1.4;
		max-width: 900px;
		width: 100%; /* Ensure the disclaimer takes full width of the centered container */
	}
</style>

<footer>
	<div class="footer-columns">
		<div class="footer-column">
			<h4>Community</h4>
			<ul>
				{#each communityLinks as link}
					<li><a href={link.href}>{link.text}</a></li>
				{/each}
			</ul>
		</div>
		<div class="footer-column">
			<h4>Resources</h4>
			<ul>
				{#each resourcesLinks as link}
					<li><a href={link.href}>{link.text}</a></li>
				{/each}
			</ul>
		</div>
		<div class="footer-column">
			<h4>Guidelines</h4>
			<ul>
				{#each rulesLinks as link}
					<li><a href={link.href}>{link.text}</a></li>
				{/each}
			</ul>
		</div>
		<div class="footer-column">
			<h4>Donate</h4>
			<ul>
				{#each donateLinks as link}
					<li><a href={link.href}>{link.text}</a></li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="language-select">
		<select>
			<option value="en" selected>English</option>
            <hr />
            <option disabled>If you came here expecting for your language, sorry!</option>
            <option disabled>We currently haven't implemented support for other languages.</option>
            <option disabled>Stay tuned!</option>
		</select>
	</div>

	<p class="disclaimer">
		AmpMod is not affiliated with Scratch, the Scratch Team, the Scratch Foundation, or the TurboWarp developers.
	</p>
</footer>