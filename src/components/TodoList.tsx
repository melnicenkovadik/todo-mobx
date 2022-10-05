import styled from 'styled-components';
import { ITodoList } from '../shared/types';
import { observer } from 'mobx-react-lite';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 0;
  max-width: 320px;
  margin: 0 auto;
  width: 100%;
`;

export const TodoList = observer(({ children }: ITodoList) => {
  return <List>{children}</List>;
});
