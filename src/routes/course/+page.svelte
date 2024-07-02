<script lang="ts">
    import type { Course } from '$lib/types';

    // Assume we're fetching the course data from an API or passing it as a prop
    export let course: Course;

    // Example course data
    course = {
        id: 1,
        name: 'Introduction to Programming',
        description: 'Learn the basics of programming using Python. This course covers fundamental concepts such as variables, loops, and functions.',
        duration: 40,
        credits: 3.0,
        level: 'Beginner',
        institutes: [
            { id: 1, name: 'Institute of Technology' },
            { id: 2, name: 'School of Computer Science' }
        ],
        teachers: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' }
        ],
        tags: [
            { id: 1, name: 'Programming' },
            { id: 2, name: 'Python' },
            { id: 3, name: 'Beginner' }
        ]
    };

</script>

<div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">{course.name}</h1>
    
    <div class="bg-white text-gray-700 shadow-md rounded-lg p-6 mb-6">
        <p class=" mb-4">{course.description}</p>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <h2 class="text-lg font-semibold mb-2">Duration</h2>
                <p>{course.duration} hours</p>
            </div>
            <div>
                <h2 class="text-lg font-semibold mb-2">Credits</h2>
                <p>{course.credits} points</p>
            </div>
            <div>
                <h2 class="text-lg font-semibold mb-2">Level</h2>
                <p>{course.level}</p>
            </div>
        </div>
        
        <div class="mb-4">
            <h2 class="text-lg font-semibold mb-2">Institutes</h2>
            <ul class="list-disc list-inside">
                {#each course.institutes as institute}
                    <li>{institute.name}</li>
                {/each}
            </ul>
        </div>
        
        <div class="mb-4">
            <h2 class="text-lg font-semibold mb-2">Teachers</h2>
            <ul class="list-disc list-inside">
                {#each course.teachers as teacher}
                    <li>{teacher.name}</li>
                {/each}
            </ul>
        </div>
        
        <div>
            <h2 class="text-lg font-semibold mb-2">Tags</h2>
            <div class="flex flex-wrap gap-2">
                {#each course.tags as tag}
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {tag.name}
                    </span>
                {/each}
            </div>
        </div>
    </div>
</div>

<a
  href="/"
  class="fixed top-4 left-4 p-2 bg-neutral-500 text-white rounded hover:bg-neutral-600"
>
  Home
</a>