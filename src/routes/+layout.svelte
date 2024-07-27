<script>
  import "../app.css";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { fly } from 'svelte/transition';

  onMount(() => {
    if (browser) {
      document.addEventListener("mousemove", function (e) {
        // const lightEffect = document.getElementById("light-effect");
        // if (lightEffect) {
        //   lightEffect.style.left = `${e.pageX}px`;
        //   lightEffect.style.top = `${e.pageY}px`;
        //     }
        document.addEventListener("mousemove", function (e) {
          const cube = document.getElementById("cube");
          if (cube) {
            cube.style.left = `${e.pageX}px`;
            cube.style.top = `${e.pageY}px`;
          }
        });
      });
    }
  });



  let isMenuOpen = false;
  let isMobile = false;

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  let dropdowns = {
    courses: false,
    teachers: false,
    institutes: false
  };

  function toggleDropdown(key) {
    dropdowns[key] = !dropdowns[key];
  }
</script>


<nav class="bg-gray-800 text-white p-4">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/" class="text-xl font-bold">Logo</a>
    
    {#if isMobile}
      <button on:click={toggleMenu} class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    {:else}
      <div class="hidden md:flex space-x-4">
        <a href="/courses" class="hover:text-gray-300">Courses</a>
        <a href="/teachers" class="hover:text-gray-300">Teachers</a>
        <a href="/institutes" class="hover:text-gray-300">Institutes</a>
      </div>
    {/if}
  </div>
</nav>

{#if isMobile && isMenuOpen}
  <div
    transition:fly={{ x: 300, duration: 300 }}
    class="fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-4 overflow-y-auto"
  >
    <button on:click={toggleMenu} class="absolute top-4 right-4">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    
    <div class="mt-8">
      <a href="/" class="block py-2">Home</a>
      <a href="/courses" class="block py-2">Courses</a>
      
      <div class="py-2">
        <button on:click={() => toggleDropdown('add')} class="flex justify-between items-center w-full">
          Add
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {#if dropdowns.add}
          <div class="pl-4 mt-2">
            <a href="/courses/add" class="block py-1">Add Course</a>
            <a href="/institutes/add" class="block py-1">Add Institute</a>
            <a href="/teachers/add" class="block py-1">Add Teacher</a>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}


<slot />
