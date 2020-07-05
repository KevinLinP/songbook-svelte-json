<script>
  export let song

  const urlObj = new window.URL(song.url)
  const displayUrl = urlObj.hostname.replace('www.', '')
  const metadataToDisplay = ['tune', 'by', 'from', 'note']

  function scrollTop() {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  $: songLines = song.mainContentPlain.split('\n')
</script>

<header class="mt-4 mb-4">
  <h1 class="display-2">{ song.title }</h1>
  {#each metadataToDisplay as key}
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

<div class="mt-4 mb-4 d-flex align-items-center justify-content-between">
  <div>
    <small class="text-muted">
      source:
      <a href={song.url} target="_blank" class="text-decoration-none text-muted">
        { displayUrl }
      </a>
    </small>
  </div>

  <button class="btn btn-light btn-sm mr-1" on:click={scrollTop} style="filter: saturate(0);">⇧</button>
</div>