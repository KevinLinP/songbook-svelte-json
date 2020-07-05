<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition';
  import SongSelect from './SongSelect.svelte'
  import Song from './Song.svelte'
  import { params } from 'svelte-hash-router'

  let songs = {}
  let loading = false
  
  onMount(() => {
    setTimeout(() => {
      loading = true
    }, 250)
  })

  async function loadSongs() {
    const { default: loadedSongs } = await import(/* webpackChunkName: "songs" */ /* webpackPreload: true */ './songs.json')
    songs = loadedSongs
    loading = false
  }
  loadSongs()

  $: slug = $params.slug
  $: song = songs[slug]
</script>

<div class="my-3">
  <SongSelect {songs}/>
</div>

{#if slug}
  {#if song}
    <Song song={song}/>
  {:else}
    {#if loading}
      <span class="text-muted" in:fade>Loading ...</span>
    {/if}
  {/if}
{:else}
  <header class="mt-4 mb-4">
    <h1 class="display-5">Hash House Harriers Songbook</h1>
  </header>

  <p class="mb-5">Search to begin.</p>
  <p class="text-muted">Add this page to your homescreen and your phone will try to remember the songs for a few days.</p>
{/if}