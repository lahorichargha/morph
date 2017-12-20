import SVG from './svg.js'

const NATIVE = [
  'Animated',
  'Image',
  'KeyboardAvoidingView',
  'ScrollView',
  'StyleSheet',
  'Text',
  'TextInput',
  'TouchableWithoutFeedback',
  'TouchableHighlight',
  'View',
]

export default ({ cssDynamic, cssStatic, isReactNative, uses }, getImport) => {
  const usesNative = []
  const usesSvg = []

  const useNative = d => {
    if (!usesNative.includes(d)) {
      usesNative.push(d)
    }
  }
  const useSvg = d => {
    if (!usesSvg.includes(d)) {
      usesSvg.push(d)
    }
  }

  const dependencies = []
  uses.sort().forEach(d => {
    if (isReactNative && NATIVE.includes(d)) {
      useNative(d)
    } else if (isReactNative && SVG.includes(d)) {
      useSvg(
        d === 'Svg'
          ? d
          : d === 'SvgGroup'
            ? `G as SvgGroup`
            : `${d.replace('Svg', '')} as ${d}`
      )
    } else if (/^[A-Z]/.test(d) || /\.data$/.test(d)) {
      dependencies.push(getImport(d))
    }
  })

  if (cssDynamic && cssStatic) {
    dependencies.push('import styled, { css } from "react-emotion"')
  } else if (cssStatic) {
    dependencies.push('import { css } from "react-emotion"')
  } else if (cssDynamic) {
    dependencies.push('import styled from "react-emotion"')
  }

  if (usesSvg.length > 0) {
    const svg = usesSvg.filter(m => m !== 'Svg').join(', ')
    dependencies.push(`import Svg, { ${svg} } from 'react-native-svg'`)
  }

  if (usesNative.length > 0) {
    dependencies.push(`import { ${usesNative.join(', ')} } from 'react-native'`)
  }

  return dependencies.join('\n')
}
