<script lang="ts">
    import { goto } from '$app/navigation';
    import type { CreateInstituteRequest, InstituteResponse } from '$lib/types';
  
    let name = '';
    let description = '';
  
    async function handleSubmit() {
      const instituteData: CreateInstituteRequest = {
        name,
        description,
      };
  
      try {
        const response = await fetch('http://localhost:8080/api/v1/institutes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(instituteData),
          credentials: 'include', // This is crucial for including cookies
        });
  
        if (!response.ok) {
          throw new Error('Failed to create institute');
        }
  
        const newInstitute: InstituteResponse = await response.json();
        console.log('Institute created:', newInstitute);
        goto('/institutes');
      } catch (error) {
        console.error('Error creating institute:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  </script>
  
  <main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Add Institute</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-200">Name</label>
        <input
          type="text"
          id="name"
          bind:value={name}
          required
          placeholder="Enter institute's name"
          class="mt-1 block w-full px-3 py-2 bg-neutral-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white placeholder-gray-400"
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-200">Description</label>
        <textarea
          id="description"
          bind:value={description}
          required
          placeholder="Enter institute's description"
          class="mt-1 block w-full px-3 py-2 bg-neutral-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white placeholder-gray-400"
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Institute
        </button>
      </div>
    </form>
  </main>