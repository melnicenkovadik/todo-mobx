import {  useState } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import Button from "./Button";
import ActionButton from "./ActionButton";
import RemoveIcon from "./RemoveIcon";
import { ITodo, useTodoContext } from "../context/stores-context";

const Item = styled.li`
  margin-top: -1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Todo = ({ id, title, done }: ITodo) => {
  const store = useTodoContext();

  const [checked, setChecked] = useState(done);

  const handleChecked = () => {
    setChecked(!checked);
    store.toggleDone(id);
  };
  const handleRemove = () => store.removeTodo(id);

  return (
    <Item>
      <Button checked={checked} onClick={handleChecked}>
        <Checkbox checked={checked} />
        <span>{title}</span>
      </Button>
      <ActionButton
        onClick={handleRemove}
        action="remove"
        display="flex"
        alignItems="center"
        justifyItems="center"
      >
        <RemoveIcon />
      </ActionButton>
    </Item>
  );
};

