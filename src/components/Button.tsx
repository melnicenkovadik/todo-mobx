import styled from 'styled-components';

export default styled.button`
  background: white;
  border: none;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 8px 4px;
  min-width: 320px;
  text-align: left;
  line-height: 24px;
  font-size: 13px;
  color: ${(props: { checked: boolean }) =>
    props.checked ? '#ccc' : '#1b1b1b'};
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus {
    background: #f5f5f5;
  }
`;
