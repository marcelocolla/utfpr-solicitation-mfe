import styled from 'styled-components'
import ToggleButton from '@material-ui/lab/ToggleButton'

export const ToggleStyled = styled(ToggleButton)`
  &.MuiButtonBase-root {
    height: 5rem;
    margin: 1rem;
    border-radius: 20px;

    color: white;
    font-size: 1.2rem;
    text-transform: capitalize;
    background-color: var(--color-orange-default);
    opacity: 50%;

    &.Mui-selected {
      color: white;
      font-weight: bold;
      opacity: 100%;
      background-color: var(--color-orange-default);

      &:hover {
        color: white;
        background-color: var(--color-orange-dark-10);
        box-shadow: 0px 4px 12px var(--color-orange-box-shadow-dark-hover);
      }
    }

    &:hover {
      color: white;
      background-color: var(--color-orange-dark-10);
      box-shadow: 0px 4px 12px var(--color-orange-box-shadow-dark-hover);
    }
  }
`
