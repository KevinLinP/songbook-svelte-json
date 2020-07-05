<script>
  export let song
</script>

<header class="mt-4 mb-4">
  <h1 class="display-6">{ song.title }</h1>
  {#if song.tune}
    <p class="text-muted">tune: {song.tune}</p>
  {/if}
</header>

<div style="font-size: 1.3rem;">{@html song.mainContentHtml}</div>

<div class="mt-4 mb-5">
  <p class="text-muted">
    source:
    <a href={song.url} target="_blank" class="text-decoration-none text-muted">
      {song.url.replace(/https?\:\/\//, '')}
    </a>
  </p>
</div>