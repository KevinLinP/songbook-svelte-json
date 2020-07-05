<script>
  export let song

  const urlObj = new window.URL(song.url)
  const displayUrl = urlObj.hostname.replace('www.', '')

  function scrollTop() {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
</script>

<header class="mt-4 mb-4">
  <h1 class="display-2">{ song.title }</h1>
  {#if song.tune}
    <small class="text-muted">tune: {song.tune}</small>
  {/if}
</header>

<div class="text-song">{@html song.mainContentHtml}</div>

<div class="mt-4 mb-5 d-flex align-items-center justify-content-between">
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