import styled from 'styled-components'

export const StatsPage = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
`

export const StatsPageContent = styled.div`
  padding: 3% 10%;
  padding-bottom: 7%;
  flex-grow: 1;

  // We have to limit the starting height 
  // if we wouldn't do this the vocabulary-list
  // would just be incredibly long instead of
  // it having a nice scroll-bar
  height: 0;
`
