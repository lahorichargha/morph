import {
  getScope,
  getToggle,
  isCode,
  isCodeInvalid,
  isMargin,
  isPadding,
  isScope,
  isStyle,
  isToggle,
} from './helpers.js'

export default (prop, value) => {
  const tags = {}

  if (isCode(value)) tags.code = isCodeInvalid(value) ? 'invalid' : true
  if (isMargin(prop)) tags.margin = true
  if (isPadding(prop)) tags.padding = true
  if (isStyle(prop)) tags.style = true
  if (isScope(value)) tags.scope = getScope(value)
  if (isToggle(value)) tags.toggle = getToggle(value)

  return tags
}
