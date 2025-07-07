<svelte:head>
  <title>Banned - AmpMod</title>
</svelte:head>
<script lang="ts">
    import { onMount } from 'svelte';
    import Spinner from '$components/spinner/Spinner.svelte';
  
    let showAppealForm = false;
    let appealText = '';
    let appealStatus = '';
    let isSubmitting = false;
  
    let banType: any = '';
    let banReason: any = '';
    let showAppealButton = true;
    let fullyLoaded = false;
  
    onMount(() => {
      fullyLoaded = true;
      const urlParams = new window.URLSearchParams(window.location.search);
      banType = urlParams.get('type');
      banReason = urlParams.get('reason');
  
      if (banReason === 'csam') {
        showAppealButton = false;
        showAppealForm = false; // Ensure appeal form is also hidden
      } else if (banReason == 'banevasion') {
        showAppealButton = false;
        showAppealForm = false;
      } else if (banReason == 'selfharm') {
        showAppealButton = false;
        showAppealForm = false;
      } else if (banType && banType.includes('temporary')) {
        showAppealButton = false;
      } else if (banType && banType.includes('noappeal')) {
        showAppealButton = false;
      }
    });
  
    async function submitAppeal() {
      isSubmitting = true;
      appealStatus = 'Submitting appeal...';
  
      // Simulate an API call (replace with your actual API endpoint)
      const appealData = {
        reason: banReason,
        type: banType,
        explanation: appealText,
      };
      console.log('Appeal Data:', appealData);
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      // In a real application, you would send the appealData to your server
      console.log('Appeal submitted:', appealText);
  
      // Simulate a successful appeal (replace with actual API response handling)
      const isAppealSuccessful = Math.random() < 0.5; // Simulate success/failure
  
      if (isAppealSuccessful) {
        appealStatus = 'Appeal submitted successfully. We will review it shortly.';
        showAppealForm = false;
        appealText = '';
      } else {
        appealStatus = 'Appeal submission failed. Please try again later.';
      }
  
      isSubmitting = false;
    }
  
    function getBanReasonDisplay() {
      switch (banReason) {
        case 'swearing':
          return 'inappropriate language';
        case 'spam':
          return 'spam';
        case 'forks':
          return 'posting projects that are not compatible with the official AmpMod editor';
        case 'csam':
          return 'posting content that is harmful to children';
        case 'banevasion':
          return 'using an alternate account to circumvent a ban on another account';
        case 'pii':
          return 'posting personally identifiable information (PII)';
        case 'selfharm':
          return 'expressing thoughts of self-harm';
        default:
          return 'breaking guidelines';
      }
    }
  
    function getBanTypeDisplay() {
      switch (banType) {
        case 'temporary':
          return 'temporary';
        case 'permanent':
          return 'permanent';
        case 'permanent-noappeal':
          return 'permanent with no option to appeal';
        case 'ip':
          return 'temporary (IP ban)';
        case 'ip-noappeal':
          return 'permanent (IP ban) with no option to appeal';
        default:
          return 'indefinite';
      }
    }
  </script>
  
  <style>
    .ban-container {
        max-width: 900px;
        margin: 64px auto;
        border-radius: 8px;
        font-family: var(--font-stack);
        font-size: 1.02em;
    }
  
    .ban-message {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: #dc3545; /* Error red */
    }
  
    .ban-details {
      margin-bottom: 1rem;
      color: #555;
      font-style: italic;
    }
  
    .appeal-button {
      padding: 0.75rem 1.5rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
    }
  
    .appeal-form {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
  
    .appeal-form label {
      font-weight: bold;
    }
  
    .appeal-form textarea {
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
      min-height: 100px;
    }
  
    .appeal-form button {
      padding: 0.75rem 1.5rem;
      background-color: #28a745; /* Success green */
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
    }
  
    .appeal-form button:hover {
      background-color: #1e7e34;
    }
  
    .appeal-status {
      margin-top: 1rem;
      font-style: italic;
      color: #6c757d; /* Secondary grey */
    }
  
    .disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  </style>
  
  <div class="ban-container">
    {#if fullyLoaded}
      <h1 class="ban-message">You have been banned from AmpMod.</h1>
      <p class="ban-details">Reason: {getBanReasonDisplay()}</p>
      {#if banType}
        <p class="ban-details">This ban is {getBanTypeDisplay()}.</p>
      {/if}
      {#if banReason != 'csam'}
        <p>
          Please read the <a href="/proj-guidelines">Project Uploading Guidelines</a>.
        </p>
      {/if}
    
      {#if showAppealButton && !banType.includes('temporary')}
        {#if !showAppealForm}
          <p>If you believe this is a mistake or that you have learned from your actions, you can appeal this ban.</p>
          <button class="appeal-button" on:click={() => (showAppealForm = true)}>Appeal Ban</button>
        {/if}
    
        {#if showAppealForm}
          <div class="appeal-form">
            <p>Keep in mind:</p>
            <ul>
              <li>
                Be respectful and honest in your appeal. Being disrespectful may cause your ban to be unappealable.
              </li>
              <li>
                Don't play the "I was hacked" or "Someone told me to open the console" card unless you really have
                been hacked. We can tell.
              </li>
              <li>
                Please check the AmpMod website daily for updates on your appeal status, or your
                email if you provided one when registering or in your settings.
              </li>
              <li>
                If your ban was for posting content harmful to children, your appeal will be
                denied immediately, and you will be reported to the Scratch Team, who will
                delete your Scratch account and report you to the relevant authorities.
              </li>
            </ul>
            <label for="appeal-text">Explain why you believe this ban should be reconsidered:</label>
            <textarea id="appeal-text" bind:value={appealText}></textarea>
            <button on:click={submitAppeal} disabled={isSubmitting} class:disabled={isSubmitting}>
              {#if isSubmitting}
                Submitting...
              {:else}
                Submit Appeal
              {/if}
            </button>
            {#if appealStatus}
              <p class="appeal-status">{appealStatus}</p>
            {/if}
            <button on:click={() => (showAppealForm = false)}>Cancel</button>
          </div>
        {/if}
      {/if}
      {#if banReason === 'csam'}
        <p style="color: darkred; font-weight: bold;">Abusing children is a very serious crime. You have been reported to the Scratch Team, who will delete your Scratch account and report you to the relevant authorities. You will never be welcome back on AmpMod or Scratch.</p>
        <p style="color: darkred; font-weight: bold;">Your IP address and any future IP addresses used to access AmpMod using this browser have been banned.</p>
        {:else if banReason == 'banevasion'}
        <p>Log in to your main account to learn more or to appeal the ban.</p>
        {:else if banReason == 'selfharm'}
        <p>This ban is to help with your mental health. <strong>Please consult a mental health resource.</strong> We care about your well-being and want to protect you. AmpMod provides a list of mental health resources available <a href="/banned/mental">here</a>.</p>
      {/if}
    {:else}
      <Spinner />
    {/if}
  </div>