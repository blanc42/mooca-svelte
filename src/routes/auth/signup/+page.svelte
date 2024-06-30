<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  const dispatch = createEventDispatcher();

  /**
     * @param {{ preventDefault: () => void; }} event
     */
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:8000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, role : { id : 1 } })
    });
    
    if (response.ok) {
      dispatch('signupSuccess');
      console.log('signupSuccess');
    //   goto('/login');
    } else {
      const error = await response.json();
      console.error(error);
    }
  }
</script>

<style lang="postcss">
  .signup-container {
    @apply flex items-center justify-center h-screen;
  }
  .signup-box {
    @apply p-8 rounded-lg shadow-md w-96 bg-neutral-700;
  }
  .signup-input {
    @apply w-full p-2 mb-4 border border-gray-300 rounded bg-neutral-500 text-gray-950 placeholder:text-gray-900 border-neutral-600;
  }
  .signup-button {
    @apply w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600;
  }
</style>

<div class="signup-container">
  <form class="signup-box" on:submit={handleSubmit}>
    <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
    <input
      class="signup-input"
      type="text"
      placeholder="Username"
      bind:value={username}
      required
    />
    <input
      class="signup-input"
      type="password"
      placeholder="Password"
      bind:value={password}
      required
    />
    <button class="signup-button" type="submit">Sign Up</button>
  </form>
</div>
