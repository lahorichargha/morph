import { isGoogleFont } from '../fonts.js'

export default ({ font, files }) => {
  let body

  if (isGoogleFont(font.family)) {
    body = `injectGlobal("@import url('https://fonts.googleapis.com/css?family=${font.family.replace(
      /\s/g,
      '+'
    )}:${font.weight}${font.style === 'italic' ? 'i' : ''}');")`
  } else {
    const sources = files.filter(src => font.id === src.id)

    body = `${sources
      .map(src => `import ${src.type} from '${src.relativeFile}'`)
      .join('\n')}

injectGlobal(\`@font-face {
  font-family: '${font.family}';
  font-style: ${font.style};
  font-weight: ${font.weight};
  src: ${sources
    .map(src => `url(\${${src.type}}) format('${src.type}')`)
    .join(', ')};
}\`)`
  }

  return `import { injectGlobal } from 'react-emotion'\n${body}`
}
