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
    const response = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
      dispatch('loginSuccess');
      console.log('loginSuccess');
      // goto('/dashboard'); // Uncomment to redirect after login
    } else {
      const error = await response.json();
      console.error(error);
    }
  }
</script>

<style lang="postcss">
  .login-container {
    @apply flex items-center justify-center h-screen;
  }
  .login-box {
    @apply p-8 rounded-lg shadow-md w-96 bg-neutral-700;
  }
  .login-input {
    @apply w-full p-2 mb-4 border border-gray-300 rounded bg-neutral-500 text-gray-950;
  }
  .login-button {
    @apply w-full p-2 bg-blue-500 text-white rounded;
  }
</style>

<div class="login-container">
  <form class="login-box" on:submit={handleSubmit}>
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
    <input
      class="login-input"
      type="text"
      placeholder="Username"
      bind:value={username}
      required
    />
    <input
      class="login-input"
      type="password"
      placeholder="Password"
      bind:value={password}
      required
    />
    <button class="login-button" type="submit">Login</button>
  </form>
</div>

<a
  href="/"
  class="fixed top-4 left-4 p-2 bg-neutral-500 text-white rounded hover:bg-neutral-600"
>
  Home
</a>