<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition';
  import SongSelect from './SongSelect.svelte'
  import Song from './Song.svelte'
  import { params } from 'svelte-hash-router'

  let songs = {}
  let loading = false
  let scrollY = 0
  let songSelectBox = null
  
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
  $: songSelectTop = songSelectBox ? songSelectBox.getBoundingClientRect().top : null
  $: backToTopVisible = (scrollY > songSelectTop)
</script>

<svelte:window bind:scrollY={scrollY}/>

<div class="my-3">
  <span bind:this={songSelectBox}>
    <SongSelect {songs}/>
  </span>
</div>

{#if slug}
  {#if song}
    <Song {song} {backToTopVisible}/>
  {:else}
    {#if loading}
      <span class="text-muted" in:fade>Loading ...</span>
    {/if}
  {/if}
{:else}
  <header class="mt-4 mb-4">
    <h1 class="display-3">Hash House Harriers Songbook</h1>
  </header>

  <div class="mb-4">
    <small>Search to begin.</small>
  </div>

  <small class="text-muted">Add this page to your homescreen and your phone will try to remember the songs for a few days.</small>
{/if}