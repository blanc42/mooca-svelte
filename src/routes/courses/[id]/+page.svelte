<script lang="ts">
  import { onMount } from 'svelte';
  import type { CourseResponse } from '$lib/types';
  import { page } from '$app/stores';

  let course: CourseResponse | null = null;
  let error: string | null = null;

  onMount(async () => {
    const courseId = $page.params.id;
    try {
      const response = await fetch(`http://localhost:8080/api/v1/courses/${courseId}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch course');
      }
      course = await response.json();
      console.log(course)
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred';
    }
  });
</script>

<main class="container mx-auto p-8 max-w-4xl">
  {#if error}
    <div class="bg-red-600 text-white p-4 rounded-lg shadow-lg mb-6">
      <p class="font-semibold">{error}</p>
    </div>
  {:else if course}
    <h1 class="text-4xl font-bold mb-6 text-indigo-300">{course.name}</h1>
    <div class="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <p class="text-gray-300 text-lg mb-4">{course.description}</p>
      
      <h2 class="text-2xl font-semibold mb-4 text-indigo-200">Institutes</h2>
      {#if course.institutes && course.institutes.length > 0}
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {#each course.institutes as institute}
            <li class="bg-gray-700 text-gray-200 p-3 rounded-md shadow">{institute.name}</li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-400 mb-6 italic">No institutes associated with this course.</p>
      {/if}
      
      <h2 class="text-2xl font-semibold mb-4 text-indigo-200">Teachers</h2>
      {#if course.teachers && course.teachers.length > 0}
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each course.teachers as teacher}
            <li class="bg-gray-700 text-gray-200 p-3 rounded-md shadow flex items-center">
              <svg class="w-6 h-6 mr-2 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              {teacher.name}
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-400 italic">No teachers associated with this course.</p>
      {/if}
    </div>
  {:else}
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-300"></div>
    </div>
  {/if}
</main>

<style>
  :global(body) {
    background-color: #1a1a2e;
    color: #ffffff;
  }
</style>
