<script lang="ts">
  import { z } from 'zod';
  import { goto } from '$app/navigation';

  // Define the login request and response types using Zod
  const LoginRequest = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  type LoginRequestType = z.infer<typeof LoginRequest>;

  const LoginResponse = z.object({
    message: z.string(),
  });

  type LoginResponseType = z.infer<typeof LoginResponse>;

  let email = '';
  let password = '';
  let errorMessage = '';

  async function handleLogin(event: SubmitEvent) {
    event.preventDefault();
    errorMessage = '';

    try {
      const loginData: LoginRequestType = { email, password };
      const response = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include', // This is crucial for including cookies
      });

      if (response.ok) {
        const data: LoginResponseType = await response.json();
        console.log('Login successful:', data.message);
        // goto('/');
      } else {
        const error = await response.json();
        errorMessage = error.error || 'Login failed. Please try again.';
      }
    } catch (error) {
      console.error('Error during login:', error);
      errorMessage = 'An unexpected error occurred. Please try again.';
    }
  }
</script>

<div class="flex items-center justify-center h-screen">
  <form
    class="p-8 rounded-lg shadow-md w-96 bg-neutral-700"
    on:submit={handleLogin}
  >
    <h2 class="text-2xl font-bold mb-6 text-center text-white">Login</h2>
    {#if errorMessage}
      <p class="text-red-500 mb-4">{errorMessage}</p>
    {/if}
    <input
      class="w-full p-2 mb-4 border border-gray-300 rounded bg-neutral-500 text-gray-950 placeholder:text-gray-900 border-neutral-600"
      type="email"
      placeholder="Email"
      bind:value={email}
      required
    />
    <input
      class="w-full p-2 mb-4 border border-gray-300 rounded bg-neutral-500 text-gray-950 placeholder:text-gray-900 border-neutral-600"
      type="password"
      placeholder="Password"
      bind:value={password}
      required
    />
    <button
      class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      type="submit">Login</button
    >
  </form>
</div>

<a
  href="/"
  class="fixed top-4 left-4 p-2 bg-neutral-500 text-white rounded hover:bg-neutral-600"
>
  Home
</a>