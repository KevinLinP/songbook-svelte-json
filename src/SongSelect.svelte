<script>
  import _ from 'lodash'
  import Select from 'svelte-select'
  
  export let songs
  const staticOptions = [
    {title: 'Home', route: '/', icon: '🏠'}
  ]
  let selectOptions = staticOptions.concat([
    {title: 'Loading ...', loading: true}
  ])

  const selectProps = {
    isVirtualList: true,
    placeholder: 'Search ...',
    optionIdentifier: '_id',
    inputStyles: 'font-size: 1rem;',
    listPlacement: 'bottom',
    getOptionLabel: (option, filterText) => {
      let html = option.title

      if (option.loading) {
        html = `<span class="text-muted">${html}</span>`
      }

      if (option.icon) {
        html = `<div class="d-flex justify-content-between"><div>${html}</div><div style="filter: saturate(0);">${option.icon}</div></div>`
      }

      return html
    },
  }

  let selectedValue = null;

  $: if (_.keys(songs).length > 0) {
    let songOptions = _.values(songs)
    songOptions = _.sortBy(songOptions, ['title'])
    selectOptions = staticOptions.concat(songOptions)
  }

  $: if (selectedValue) {
    if (selectedValue.slug) {
      window.location.href = `/#/${selectedValue.slug}`
    } else if (selectedValue.route) {
      window.location.href = `/#${selectedValue.route}`
    }

    selectedValue = null
  }
</script>

<Select items={selectOptions} {...selectProps} bind:selectedValue></Select>