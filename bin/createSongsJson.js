const _ = require('lodash')
const fs = require('fs');
const showdown = require('showdown')
const slugify = require('slugify')

const converter = new showdown.Converter();

const [_n, _c, filename] = process.argv

let songsJson = JSON.parse(fs.readFileSync(filename, 'utf8'));
songsJson.forEach((song) => transformSong(song))
songsJson = _.uniqBy(songsJson, (s) => s.slug)
checkSlugsUnique(songsJson)

songsJson = _.sortBy(songsJson, ['title'])
songsJson = _.reduce(songsJson, (acc, song) => {
  acc[song.slug] = song
  return acc
}, {})

fs.writeFileSync('public/songs.json', JSON.stringify(songsJson));

function transformSong(song) {
  song.mainContentHtml = converter.makeHtml(song.mainContentMarkdown)
  song.slug = slug(song)
  delete song.mainContentMarkdown
}

function slug(song) {
  const slug = slugify(`${song.title}`, {
    lower: true,
    strict: true,
  })

  return slug
}

function checkSlugsUnique(songs) {
  const slugs = songs.map((s) => s.slug)
  // stolen from https://codehandbook.org/javascript-find-duplicate-values-array/
  let duplicates = slugs.reduce((acc,currentValue,index, array) => {
    if(array.indexOf(currentValue)!=index && !acc.includes(currentValue)) acc.push(currentValue);
    return acc;
  }, []);

  if (duplicates.length > 0) {
    console.log(duplicates)
    throw new Error('slugs not unique')
  }
}