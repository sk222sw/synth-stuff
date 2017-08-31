import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const CenteredRow = styled(Row)`
  justify-content: center;
  align-items: center;
`
