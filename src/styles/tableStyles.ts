import {css} from '@pandacss/react'

export const HeaderRow = css({
  backgroundColor: '#5d5d66',
  fontWeight: 'bold',
  padding: '8px',
});

export const DataRow = css({
  padding: '8px',
  borderBottom: '1px solid #ccc',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    color: 'black',
  },
});