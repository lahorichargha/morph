import { wrap } from './morph-react.js'

export const getObjectAsString = obj =>
  wrap(
    Object.keys(obj)
      .map(k => {
        const v = typeof obj[k] === 'object' && hasKeys(obj[k])
          ? getObjectAsString(obj[k])
          : obj[k]
        return `${JSON.stringify(k)}: ${v}`
      })
      .join(',')
  )

export const getProp = (node, key) => {
  const finder = typeof key === 'string'
    ? p => p.key.value === key
    : p => key.test(p.key.value)

  return node.properties && node.properties.list.find(finder)
}

const styleStems = ['active', 'hover', 'activeHover', 'placeholder', 'disabled']
export const getStyleType = node =>
  styleStems.find(tag => isTag(node, tag)) || 'base'

export const hasKeys = obj => Object.keys(obj).length > 0

export const hasProp = (node, key, match) => {
  const prop = getProp(node, key)
  if (!prop) return false
  return typeof match === 'function' ? match(prop.value.value) : true
}

export const isCode = node => isTag(node, 'code')
export const isData = node => isTag(node, 'data')
export const isStyle = node => isTag(node, 'style')
export const isToggle = node => isTag(node, 'toggle')

export const isTag = (node, tag) => node.tags[tag]
