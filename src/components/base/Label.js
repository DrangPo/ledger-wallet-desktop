import styled from 'styled-components'
import { fontSize } from 'styled-system'

export default styled.label.attrs({
  fontSize: 0,
})`
  ${fontSize};
  display: block;
  text-transform: uppercase;
  letter-spacing: 1px;
`
