import styled from 'styled-components';

export default styled.button`
  background: ${(props: { action: string }) =>
    props.action === 'add' ? 'rgba(255,236,54,0.79)' : 'rgba(222,40,40,0.85)'};
  border: none;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 8px 4px;
  text-align: left;
  line-height: 24px;
  font-size: 13px;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus {
    background: ${(props: { action: string }) =>
      props.action === 'add' ? 'rgb(255,236,54)' : 'rgba(243,8,8,0.85)'};
  }
`;
