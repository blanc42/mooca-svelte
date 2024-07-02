<script lang="ts">
    import type { Institute } from '$lib/types';

    export let institute: Institute;
    institute = {
        id: 1,
        name: "Massachusetts Institute of Technology (MIT)",
        description: "MIT is a world-renowned private research university in Cambridge, Massachusetts, established in 1861. It is known for its scientific breakthroughs and technological advances.",
        location: "Cambridge, Massachusetts, USA",
        foundedYear: 1861,
        website: "https://web.mit.edu/",
        departments: [
            "Electrical Engineering and Computer Science",
            "Mechanical Engineering",
            "Physics",
            "Mathematics",
            "Chemistry",
            "Biology",
            "Economics",
            "Management"
        ]
    };
</script>

<div class="max-w-4xl text-gray-700 mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">{institute.name}</h1>
    
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
        <p class=" mb-4">{institute.description}</p>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
                <h2 class="text-lg font-semibold mb-2">Location</h2>
                <p>{institute.location}</p>
            </div>
            <div>
                <h2 class="text-lg font-semibold mb-2">Founded</h2>
                <p>{institute.foundedYear}</p>
            </div>
        </div>
        
        <div class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Website</h2>
            <a href={institute.website} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
                {institute.website}
            </a>
        </div>
        
        <div class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Departments</h2>
            <ul class="list-disc list-inside">
                {#each institute.departments as department}
                    <li>{department}</li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<a
  href="/"
  class="fixed top-4 left-4 p-2 bg-neutral-500 text-white rounded hover:bg-neutral-600"
>
  Home
</a>