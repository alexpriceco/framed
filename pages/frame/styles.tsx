import styled from 'styled-components'
import colors from '../../components/colors'

type FramedProps = {
  src: string,
}
const FramedContent = styled.img<FramedProps>`
`

const FrameSection = styled.section`
  width: 60vw;
  margin-left: 5vw;

  > * {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
  }
`

const MetaDataSection = styled.section`
  width: 25vw;
  h2 { text-transform: capitalize; }
  p + p { margin-bottom: 2em; }
  p:first-child {
    opacity: 0.5;
    margin-bottom: 0.5em;
  }
`;

const CommentSection = styled.div`
  textarea {
    width: 100%;
    height: 192px;
    border-radius: 8px;
    outline: none;
    border: none;
    resize: none;
    color: ${colors.white};
    padding: 1em;
    background: ${colors.greyDarkest};
    margin-bottom: 10px;
    box-sizing: border-box;

    &:hover {
      background: ${colors.greyDark};
      &:focus { background: ${colors.greyDarkest}; }
    }
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`

export {
  CommentSection,
  MetaDataSection,
  FrameSection,
  FramedContent,
}