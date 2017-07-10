import { css } from 'glamor'

// Choose color : https://material.io/color/

const DEFAULT = '#fff'
const DEFAULT_TEXT = '#000'

const PRIMARY = '#37474f'
const PRIMARY_LIGHT = '#62727b'
const PRIMARY_DARK = '#102027'
const PRIMARY_TEXT = '#fff'

const SECONDARY = '#f57f17'
const SECONDARY_LIGHT = '#ffb04c'
const SECONDARY_DARK = '#bc5100'
const SECONDARY_TEXT = '#fff'

// default
export const defaultColor = css({
  backgroundColor: DEFAULT,
  color: DEFAULT_TEXT,
})

// primaries
export const primaryColor = css({
  backgroundColor: PRIMARY,
  color: PRIMARY_TEXT,
})

export const primaryLightColor = css({
  backgroundColor: PRIMARY_LIGHT,
  color: PRIMARY_TEXT,
})

export const primaryDarkColor = css({
  backgroundColor: PRIMARY_DARK,
  color: PRIMARY_TEXT,
})

// secondaries
export const secondaryColor = css({
  backgroundColor: SECONDARY,
  color: SECONDARY_TEXT,
})

export const secondaryLightColor = css({
  backgroundColor: SECONDARY_LIGHT,
  color: SECONDARY_TEXT,
})

export const secondaryDarkColor = css({
  backgroundColor: SECONDARY_DARK,
  color: SECONDARY_TEXT,
})
