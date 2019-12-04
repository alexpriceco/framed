import * as React from 'react'
import styled from 'styled-components'
import colors from './colors';

type ButtonProps = {
  onClick: any,
  title?: string,
  type?: 'button' | 'submit' | 'reset',
  name?: string,
  isLight?: boolean,
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 20px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.15s ease-in-out;

  background: ${props => props.isLight ? colors.white : colors.greyDarkest};
  color: ${props => props.isLight ? colors.greyDarkest : colors.white};

  &:hover {
    background: ${props => props.isLight ? colors.greyLight : colors.greyDark};
    color: ${props => props.isLight ? colors.black : colors.white};
  }
`

const Button: React.FunctionComponent<ButtonProps> = ({ children, onClick, type, name, isLight }) => (
  <StyledButton onClick={onClick} type={type || 'button'} name={name} isLight={isLight || false}>
    {children}
  </StyledButton>
)

export default Button