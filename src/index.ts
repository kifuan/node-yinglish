import type { TaggedWord } from '@node-rs/jieba'
import jieba from '@node-rs/jieba'

function probably(probability: number): boolean {
  return Math.random() < probability
}

function generateEllipsis(level: number) {
  return probably(level) ? '...' : generateEmoji()
}

function generateEmoji() {
  const emojis = ['😍', '❤', '🥺', '🥵', '🥰']
  return emojis[Math.floor(Math.random() * emojis.length)]
}

function convertWord({ word, tag }: TaggedWord, level: number): string {
  if (!probably(level))
    return word

  word = word.replace(/,|，|。/g, generateEllipsis(level)).replace(/!|！/g, generateEmoji())

  if (tag === 'x')
    return word

  if (tag === 'n' && probably(level))
    return word.replace(/./g, '〇')

  if (tag === 'v' && probably(level))
    return word + generateEmoji()

  if (probably(level))
    return word[0] + generateEllipsis(level) + word

  return generateEllipsis(level) + word
}

export function chs2yin(sentence: string, level = 0.7) {
  return jieba.tag(sentence).map(word => convertWord(word, level)).join('')
}

