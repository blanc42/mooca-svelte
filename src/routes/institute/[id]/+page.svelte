<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { z } from 'zod';
  
    const InstituteResponse = z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      creator_id: z.number(),
    });
  
    type InstituteResponseType = z.infer<typeof InstituteResponse>;
  
    let institute: InstituteResponseType | null = null;
    let loading = true;
    let error: string | null = null;
  
    onMount(async () => {
      try {
        const id = $page.params.id;
        const response = await fetch(`http://localhost:8080/api/v1/institutes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch institute');
        }
        const data = await response.json();
        institute = InstituteResponse.parse(data);
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    });
  </script>
  
  <svelte:head>
    <title>{institute ? institute.name : 'Institute'} | MOOCA</title>
  </svelte:head>
  
  <main class="container mx-auto px-4 py-8">
    {#if loading}
      <p class="text-white">Loading institute...</p>
    {:else if error}
      <p class="text-red-500">Error: {error}</p>
    {:else if institute}
      <div class="bg-neutral-800 shadow-md rounded-lg p-6">
        <h1 class="text-3xl font-bold mb-4 text-white">{institute.name}</h1>
        <p class="text-gray-300 mb-6">{institute.description}</p>
        <div class="flex justify-between items-center">
          <span class="text-gray-400">Creator ID: {institute.creator_id}</span>
          <button
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            on:click={() => history.back()}
          >
            Back
          </button>
        </div>
      </div>
    {:else}
      <p class="text-white">No institute found.</p>
    {/if}
  </main>
  
  <style>
    /* Add any additional styles here if needed */
  </style>