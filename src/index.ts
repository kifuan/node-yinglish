import type { TaggedWord } from '@node-rs/jieba'
import jieba from '@node-rs/jieba'

function probably(probability: number): boolean {
  return Math.random() < probability
}

const fragments = {
  ellipsis(l: number) {
    return probably(l) ? '...' : this.emoji
  },
  get emoji() {
    const emojis = ['😍', '❤', '🥺', '🥵', '🥰']
    return emojis[Math.floor(Math.random() * emojis.length)]
  },
}

function convertWord({ word, tag }: TaggedWord, level: number): string {
  if (!probably(level))
    return word

  word = word.replace(/,|，|。/g, fragments.ellipsis(level)).replace(/!|！/g, fragments.emoji)

  if (tag === 'x')
    return word

  if (tag === 'n' && probably(level))
    return word.replace(/./g, '〇')

  if (tag === 'v' && probably(level))
    return word + fragments.emoji

  if (probably(level))
    return word[0] + fragments.ellipsis(level) + word

  return fragments.ellipsis(level) + word
}

export function chs2yin(sentence: string, level = 0.7) {
  return jieba.tag(sentence).map(word => convertWord(word, level)).join('')
}

