<script>
    import Button from "$lib/components/ui/button/button.svelte";

</script>

<div class="w-full h-full bg-neutral-950 text-white flex flex-col justify-center items-center">
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <div>
    <a href="/auth/signup">signup link</a>
  </div>
  <Button on:click={() => console.log("Clicked")}>Click me</Button>
</div>
  
