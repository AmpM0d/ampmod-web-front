<style>
	footer {
		background-color: var(--footer-background);
		padding: 20px;
		color: var(--text-color);
		font-size: 0.9em;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		font-family: var(--font-stack);
	}

	.footer-columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 20px;
		margin-bottom: 20px;
		max-width: 900px;
		width: 100%;
	}

	.footer-column h4 {
		margin-top: 0;
		margin-bottom: 10px;
		color: var(--text-color);
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
		color: var(--accent-color);
		text-decoration: none;
	}

	.footer-column a:hover {
		text-decoration: underline;
	}

	.language-select {
		display: flex;
		justify-content: center;
		margin-bottom: 15px;
		width: 100%;
		max-width: 300px;
	}

	select {
		padding: 8px 12px;
		border: 1px solid var(--border-color);
		border-radius: 5px;
		color: var(--text-color);
		background-color: var(--background-color);
		font-size: 0.9em;
		cursor: pointer;
		width: 100%;
	}

	.disclaimer {
		text-align: center;
		margin-top: 15px;
		color: #777;
		font-size: 0.8em;
		line-height: 1.4;
		max-width: 900px;
		width: 100%;
	}

	.footer-column a.disabled {
		cursor: not-allowed;
		color: #777;
	}
</style>

<footer>
	<div class="footer-columns">
		<div class="footer-column">
			<h4>Community</h4>
			<ul>
				<li><a href="https://ampmod.flarum.cloud">Discussion Forums</a></li>
				<li><a class="disabled" title="Not available yet">Statistics</a></li>
			</ul>
		</div>
		<div class="footer-column">
			<h4>Resources</h4>
			<ul>
				<li><a href="/about">About</a></li>
				<li><a href="https://ampmod.miraheze.org/">AmpMod Wiki</a></li>
				<li><a href="https://codeberg.org/AmpMod">Source code</a></li>
				<li><a href="https://codeberg.org/AmpMod/dev-docs/wiki">Dev docs</a></li>
				<li><a class="disabled" title="Not available yet">FAQ</a></li>
				<li><a href="/mirrors">Mirrors</a></li>
			</ul>
		</div>
		<div class="footer-column">
			<h4>Guidelines</h4>
			<ul>
				<li><a href="/proj-guidelines">Uploading Guidelines</a></li>
				<li><a href="/terms">Terms of Use</a></li>
				<li><a href="#">Privacy Policy</a></li>
			</ul>
		</div>
		<div class="footer-column">
			<h4>Donate</h4>
			<ul>
				<li><a href="https://github.com/sponsors/GarboMuffin">Donate to TurboWarp</a></li>
				<li><a href="https://www.scratchfoundation.org/donate">Donate to Scratch</a></li>
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
