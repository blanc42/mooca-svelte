<script lang="ts">
  import { goto } from '$app/navigation';
  import { z } from 'zod';

  // Define the create course request and response types using Zod
  const CreateCourseRequest = z.object({
    name: z.string(),
    description: z.string(),
    institute_ids: z.array(z.number()),
    teacher_ids: z.array(z.number()),
  });

  type CreateCourseRequestType = z.infer<typeof CreateCourseRequest>;

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

  type Institute = {
    id: number;
    name: string;
  };

  type Teacher = {
    id: number;
    name: string;
  };

  let name = '';
  let description = '';
  let selectedInstitutes: Institute[] = [];
  let selectedTeachers: Teacher[] = [];
  let institutes: Institute[] = [];
  let teachers: Teacher[] = [];
  let errorMessage = '';

  async function fetchInstitutes() {
    const response = await fetch('http://localhost:8080/api/v1/institutes');
    const data = await response.json();
    institutes = data.institutes.map((i: any) => ({ id: i.id, name: i.name }));
  }

  async function fetchTeachers() {
    const response = await fetch('http://localhost:8080/api/v1/teachers');
    const data = await response.json();
    teachers = data.teachers.map((t: any) => ({ id: t.id, name: t.name }));
  }

  function addInstitute(institute: Institute) {
    if (institute) {
      selectedInstitutes = [...selectedInstitutes, institute];
      institutes = institutes.filter((i) => i.id !== institute.id);
    }
  }

  function removeInstitute(institute: Institute) {
    selectedInstitutes = selectedInstitutes.filter((i) => i.id !== institute.id);
    institutes = [...institutes, institute];
  }

  function addTeacher(teacher: Teacher) {
    if (teacher) {
      selectedTeachers = [...selectedTeachers, teacher];
      teachers = teachers.filter((t) => t.id !== teacher.id);
    }
  }

  function removeTeacher(teacher: Teacher) {
    selectedTeachers = selectedTeachers.filter((t) => t.id !== teacher.id);
    teachers = [...teachers, teacher];
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    errorMessage = '';

    try {
      const courseData: CreateCourseRequestType = {
        name,
        description,
        institute_ids: selectedInstitutes.map((i) => i.id),
        teacher_ids: selectedTeachers.map((t) => t.id),
      };

      const response = await fetch('http://localhost:8080/api/v1/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
        credentials: 'include', // This is crucial for including cookies
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create course');
      }

      const newCourse: CourseResponseType = await response.json();
      console.log('Course created:', newCourse);
      goto('/courses');
    } catch (error) {
      console.error('Error creating course:', error);
      errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    }
  }

  fetchInstitutes();
  fetchTeachers();
</script>

<main class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Add Course</h1>
  {#if errorMessage}
    <p class="text-red-500 mb-4">{errorMessage}</p>
  {/if}
  <form on:submit={handleSubmit} class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-200">Name</label>
      <input
        type="text"
        id="name"
        bind:value={name}
        required
        placeholder="Enter course name"
        class="mt-1 block w-full px-3 py-2 bg-neutral-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white placeholder-gray-400"
      />
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-200">Description</label>
      <textarea
        id="description"
        bind:value={description}
        required
        placeholder="Enter course description"
        class="mt-1 block w-full px-3 py-2 bg-neutral-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white placeholder-gray-400"
      ></textarea>
    </div>
    <div>
      <label for="institutes" class="block text-sm font-medium text-gray-200">Institutes</label>
      <div class="flex flex-wrap gap-2 mb-2">
        {#each selectedInstitutes as institute}
          <div class="bg-neutral-700 px-2 py-1 rounded-md flex items-center">
            {institute.name}
            <button
              type="button"
              class="ml-2 text-gray-400 hover:text-gray-200"
              on:click={() => removeInstitute(institute)}
            >
              &times;
            </button>
          </div>
        {/each}
      </div>
      <select
        id="institutes"
        class="mt-1 block w-full px-3 py-2 bg-neutral-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
        on:change={(e) => {
          const selectedIndex = e.currentTarget.selectedIndex;
          if (selectedIndex > 0) {
            addInstitute(institutes[selectedIndex - 1]);
            e.currentTarget.selectedIndex = 0;
          }
        }}
      >
        <option value="">Select an institute</option>
        {#each institutes as institute}
          <option value={institute.id}>{institute.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="teachers" class="block text-sm font-medium text-gray-200">Teachers</label>
      <div class="flex flex-wrap gap-2 mb-2">
        {#each selectedTeachers as teacher}
          <div class="bg-neutral-700 px-2 py-1 rounded-md flex items-center">
            {teacher.name}
            <button
              type="button"
              class="ml-2 text-gray-400 hover:text-gray-200"
              on:click={() => removeTeacher(teacher)}
            >
              &times;
            </button>
          </div>
        {/each}
      </div>
      <select
        id="teachers"
        class="mt-1 block w-full px-3 py-2 bg-neutral-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
        on:change={(e) => {
          const selectedIndex = e.currentTarget.selectedIndex;
          if (selectedIndex > 0) {
            addTeacher(teachers[selectedIndex - 1]);
            e.currentTarget.selectedIndex = 0;
          }
        }}
      >
        <option value="">Select a teacher</option>
        {#each teachers as teacher}
          <option value={teacher.id}>{teacher.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <button
        type="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Course
      </button>
    </div>
  </form>
</main>

<a
  href="/"
  class="fixed top-4 left-4 p-2 bg-neutral-500 text-white rounded hover:bg-neutral-600"
>
  Home
</a>