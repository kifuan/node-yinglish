import jieba from '@node-rs/jieba'
/**
 * @private
 * 测试在指定概率下是否被触发。
 * @param val 指定的概率。
 * @returns 是否触发。
 */
function test(val: number): boolean {
  return Math.random() < val
}
/**
 * @private
 * 用于替换的词语碎片。
 */
const fragments = {
  /**
   * @private
   * 随机省略号
   */
  get ellipsis(): string {
    return test(0.5) ? '...' : '......'
  },
  /**
   * @private
   * 随机emoji
   */
  get emoji(): string {
    const emojis = ['😍', '❤', '🥺', '🥵', '🥰']
    return emojis[Math.floor(Math.random() * emojis.length)]
  }
}
/**
 * @private
 * 翻译单个词语。
 * @param word 词语。
 * @param tag 该词语的属性。
 * @param level 淫乱度。
 * @returns 翻译后的文本。
 */
function _translate(word: string, tag: string, level: number): string {
  if (!test(level)) {
    return word
  }
  word = word.replace(/,|，|。/g, fragments.ellipsis).replace(/!|！/g, '❤')
  const cond = [tag, test(level)]
  switch (cond) {
    case ['x', true]:
    case ['x', false]:
      return word
    case ['n', true]:
      return word.replace(/./g, '〇')
    case ['v', true]:
      return word + fragments.emoji
    default:
      return cond[1]
        ? word[0] + fragments.ellipsis + word
        : fragments.ellipsis + word
  }
}
/**
 * 翻译句子到yinglish。
 * @param sentence 句子。
 * @param level 淫乱度。在0-1之间。
 * @returns 翻译后的句子。
 */
export function chs2yin(sentence: string, level = 0.5) {
  if (level < 0 || level > 1) throw new Error('level must be between 0 and 1')
  return jieba
    .tag(sentence)
    .map(word => _translate(word.word, word.tag, level))
    .join('')
}
// 默认导出
export default chs2yin
