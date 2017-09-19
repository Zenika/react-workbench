import { css } from 'glamor'

const layout = css({
  height: '100%',
  width: '100%',
  maxHeight: '100%',
  '& blockquote': {
    marginLeft: '0',
    paddingLeft: '1em',
    borderLeft: '.4em solid #CCC',
  },
  '& blockquote p': {
    lineHeight: '1.4em',
  },
  '& table': {
    borderSpacing: 0,
    display: 'block',
    width: '100%',
    overflow: 'auto',
    marginTop: 0,
    marginBottom: '1em',
    borderCollapse: 'collapse',
  },
  '& table tr': {
    backgroundColor: '#fff',
    ':nth-child(2n)': {
      backgroundColor: '#f6f8fa',
    },
  },
  '& table thead tr th': {
    padding: '1em 1em',
    border: '.01em solid #dfe2e5',
  },
  '& table tbody tr td': {
    padding: '.8em',
    border: '.01em solid #dfe2e5',
  },
  '& code': {
    padding: '.3em',
    margin: 0,
    fontSize: '0.9em',
    backgroundColor: 'rgba(27,31,35,0.05)',
    borderRadius: '.2em',
  },
})

export default { layout }
