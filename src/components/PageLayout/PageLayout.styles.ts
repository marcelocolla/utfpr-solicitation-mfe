import styled from 'styled-components'

export const Layout = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgb(245, 245, 248);

  strong {
    font-size: 1.8rem;
    line-height: 2.5rem;
    font-weight: 700;
    margin-bottom: 4rem;
  }
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
