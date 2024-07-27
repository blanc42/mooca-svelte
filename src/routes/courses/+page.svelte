<script lang="ts">
    import { goto } from '$app/navigation';
    import { z } from 'zod';
  
    const CourseResponse = z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      creator_id: z.number(),
      institutes: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        })
      ),
      teachers: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        })
      ),
    });
  
    type CourseResponseType = z.infer<typeof CourseResponse>;
  
    let courses: CourseResponseType[] = [];
  
    async function fetchCourses() {
      const response = await fetch('http://localhost:8080/api/v1/courses');
      const data = await response.json();
      courses = data.courses;
    }
  
    fetchCourses();
  </script>
  
  <main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-white">Courses</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each courses as course}
        <div class="bg-neutral-800 rounded-lg shadow-md p-4">
          <h2 class="text-xl font-bold mb-2 text-white">{course.name}</h2>
          <p class="text-gray-300 mb-4">{course.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            {#each course.institutes as institute}
              <div class="bg-neutral-700 px-2 py-1 rounded-md text-gray-200">{institute.name}</div>
            {/each}
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            {#each course.teachers as teacher}
              <div class="bg-neutral-700 px-2 py-1 rounded-md text-gray-200">{teacher.name}</div>
            {/each}
          </div>
          <div class="flex justify-end">
            <button
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              on:click={() => goto(`/courses/${course.id}`)}>View</button
            >
          </div>
        </div>
      {/each}
    </div>
  </main>
  
  <a
    href="/course/add"
    class="fixed bottom-4 right-4 p-4 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <svg
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  </a>