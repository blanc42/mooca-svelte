<script lang="ts">
    import type { Teacher } from '$lib/types';

    export let teacher: Teacher
    teacher = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      bio: 'John is a teacher with a passion for programming.',
      specialization: 'Programming',
    }
    
</script>

<div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">{teacher.name}</h1>
    
    <div class="bg-white text-gray-600 shadow-md rounded-lg p-6 mb-6">
        <p class=" mb-4">{teacher.email}</p>
        
        <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Bio</h2>
            <p class="text-gray-700">{teacher.bio}</p>
        </div>
        
        <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Specialization</h2>
            <p class="text-gray-700">{teacher.specialization}</p>
        </div>
        
    </div>
</div>

<a
  href="/"
  class="fixed top-4 left-4 p-2 bg-neutral-500 text-white rounded hover:bg-neutral-600"
>
  Home
</a>