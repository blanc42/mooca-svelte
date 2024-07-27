<script lang="ts">
  import { goto } from "$app/navigation";

  let username = "";
  let password = "";
  let errorMessage = "";

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    errorMessage = "";

    try {
      const response = await fetch("http://localhost:8000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role: { id: 1 } }),
      });

      if (response.ok) {
        console.log("Signup successful");
        goto("/auth/login");
      } else {
        const error = await response.json();
        errorMessage = error.message || "Signup failed. Please try again.";
      }
    } catch (error) {
      console.error("Error during signup:", error);
      errorMessage = "An unexpected error occurred. Please try again.";
    }
  }
</script>

<div class="flex items-center justify-center h-screen">
  <form
    class="p-8 rounded-lg shadow-md w-96 bg-neutral-700"
    on:submit={handleSubmit}
  >
    <h2 class="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
    {#if errorMessage}
      <p class="text-red-500 mb-4">{errorMessage}</p>
    {/if}
    <input
      class="w-full p-2 mb-4 border border-gray-300 rounded bg-neutral-500 text-gray-950 placeholder:text-gray-900 border-neutral-600"
      type="text"
      placeholder="Username"
      bind:value={username}
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
      type="submit">Sign Up</button
    >
  </form>
</div>

<a
  href="/"
  class="fixed top-4 left-4 p-2 bg-neutral-500 text-white rounded hover:bg-neutral-600"
>
  Home
</a>
