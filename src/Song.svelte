<script>
  import { fade } from 'svelte/transition';

  export let song
  export let backToTopVisible

  let displayUrl = null
  const metadataKeys = ['tune', 'by', 'from', 'note']

  function scrollTop() {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  $: songLines = song.mainContentPlain.split('\n')
  $: {
    const urlObj = new window.URL(song.url)
    displayUrl = urlObj.hostname.replace('www.', '')
  }
</script>

<header class="mt-4 mb-4">
  <h1 class="display-2">{ song.title }</h1>
  {#each metadataKeys as key}
  {#if song[key]}
    <small class="text-muted">{key}: {song[key]}</small>
  {/if}
  {/each}
</header>

<div class="text-song">
{#each songLines as line}
  <div>{line}</div>
{/each}
</div>

<div class="mt-4 mb-5 d-flex align-items-center justify-content-between">
  <div>
    <small class="text-muted">
      source:
      <a href={song.url} target="_blank" class="text-decoration-none text-muted">
        { displayUrl }
      </a>
    </small>
  </div>

{#if backToTopVisible}
  <button class="btn btn-light btn-sm mr-1" on:click={scrollTop} transition:fade>⇧</button>
{/if}
</div>