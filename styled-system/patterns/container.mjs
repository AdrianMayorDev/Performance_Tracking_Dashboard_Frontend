import { getPatternStyles, patternFns } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const containerConfig = {
transform(props) {
  delete props.centerContent;
  return Object.assign(
    {
      position: "relative",
      width: "100%",
      maxWidth: "7xl",
      mx: "auto",
      paddingX: { base: "4", md: "6" }
    },
    props
  );
}}

export const getContainerStyle = (styles = {}) => {
  const _styles = getPatternStyles(containerConfig, styles)
  return containerConfig.transform(_styles, patternFns)
}

export const container = (styles) => css(getContainerStyle(styles))
container.raw = getContainerStyle