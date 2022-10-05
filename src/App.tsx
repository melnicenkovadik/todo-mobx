import { Todo } from "./components/Todo";
import AddTodo from "./components/AddTodo";
import styled from "styled-components";
import { TodoList } from "./components/TodoList";
import { useState } from "react";
import { Input } from "./components/Input";
import { TodoProvider, useTodoContext } from "./context/stores-context";
import { useObserver } from "mobx-react-lite";


const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border: none;
  padding: 8px 4px;
  min-width: 320px;
  text-align: left;
  line-height: 24px;
  font-size: 13px;
  transition: all 0.2s ease;
  outline: none;
`;
const FilterButton = styled.button`
  background: white;
  border: none;
  padding: 8px 4px;
  text-align: left;
  line-height: 24px;
  font-size: 13px;
  transition: all 0.2s ease;
  outline: none;
  cursor: pointer;
  color: ${(props: { active: string; }) => props.active ? "red" : "black"};
`;

function TodoContainer() {
  const store = useTodoContext();
  const [filter, setFilter] = useState<string>(store.filter);
  const [search, setSearch] = useState<string>("");
  const [checked, setChecked] = useState<Array<string>>([]);

  const handleCheck = (id: string) => {
    setChecked((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter(item => item !== id);
      }
      return [...prevState, id];
    });
  };

  const handleFilter = (filter: string) => {
    setFilter(filter);
    store.setFilter(filter);
  };

  const handleSearch = (e: any) => {
    e.persist();
    setSearch(e.target.value);
  };

  return useObserver(() => (
    <Container>
      <div style={{
        maxWidth: "320px",
      }}>
        есть бага, нужно выделить несколько и нажать ACTIVATE/AS DONE и оно у меня не обновляет нормально (нужно обновить страницу), не пойму почему так буду рад если расскажете в чем ошибка <a href='https://t.me/avokadikvadik'>https://t.me/avokadikvadik</a>
      </div>
      <Container>
        <div>Count: {store.todos.length}</div>
        <div> {store.show("DONE").length > 0 ? `Done: ${store.show("DONE")?.length}` : null}</div>
        <div>
          <Input
            placeholder="Search"
            onChange={handleSearch}
            value={search}
            type="text" />
          <FilterButton
            active={filter === "ALL"}
            onClick={() => handleFilter("ALL")}>
            All
          </FilterButton>
          <FilterButton
            active={filter === "DONE"}
            onClick={() => handleFilter("DONE")}>
            Done
          </FilterButton>
        </div>

      </Container>
      <AddTodo />
      <div>
        {
          checked.length > 0 ?
            <div>
              <button onClick={() => store.deleteTodos(checked)}>Delete</button>
              <button onClick={() => store.changeStatus(checked, "DONE")}>AS DONE</button>
              <button onClick={() => store.changeStatus(checked, "ACTIVE")}>ACTIVATE</button>
              <button onClick={() => setChecked([])}>Reset Checks</button>
            </div>
            : <div>
              <button onClick={() => setChecked(store.todos.map(t => t.id))}>Select all</button>
            </div>
        }
      </div>
      <TodoList>
        {search.length > 0 ? store.show(filter)
            .filter((item) => item.title.includes(search))
            .map(({
                    id,
                    title,
                    done
                  }) => (
              <Row
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}>
                <input
                  onChange={() => handleCheck(id)}
                  value={id}
                  checked={checked.includes(id)}
                  type="checkbox" />

                <Todo
                  id={id}
                  title={title}
                  done={done} />
              </Row>
            )) :
          store.show(filter)
            .map(({ id, title, done }) => (
              <Row key={id}
              >
                <input
                  onChange={() => handleCheck(id)}
                  value={id}
                  checked={checked.includes(id)}
                  type="checkbox" />
                <Todo
                  id={id}
                  title={title}
                  done={done} />
              </Row>
            ))}
      </TodoList>
    </Container>
  ));
}

export const App = () => {
  return (
    <TodoProvider>
      <TodoContainer />
    </TodoProvider>

  );
};

export default App;
