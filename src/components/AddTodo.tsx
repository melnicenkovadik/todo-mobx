import ActionButton from "./ActionButton";
import styled from "styled-components";
import { ChangeEvent,  useState } from "react";
import { Input } from "./Input";
import {  useTodoContext } from "../context/stores-context";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  border: none;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 8px 4px;
  margin: 10px auto;
  text-align: left;
  line-height: 24px;
  font-size: 13px;
  transition: all 0.2s ease;
  outline: none;
`;

const AddTodo = () => {
  const store = useTodoContext();

  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setValue(e.target.value);
  };

  const handleAdd = (title: string) => {
    if (title.length > 3) {
      store.addTodo(title);
      setValue("");
    }
  };

  return (
    <Container>
      <Input onChange={handleChange} type="text" />
      <ActionButton onClick={() => handleAdd(value)} action="add">
        Add
      </ActionButton>
    </Container>
  );
};

export default AddTodo;
