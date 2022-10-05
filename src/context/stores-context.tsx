import { createContext, ReactNode, useContext } from "react";
import { useLocalObservable } from "mobx-react-lite";
import { nanoid } from "nanoid";
import { toJS } from "mobx";

export const todoStore = createContext({} as ITodoStore);

export interface ITodo {
  id: string;
  title: string;
  done: boolean;
}

export interface ITodoStore {
  filter: string;
  todos: ITodo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  toggleDone: (id: string) => void;
  show: (filter: string) => ITodo[];
  setFilter: (filter: string) => void;
  deleteTodos: (ids: string[]) => void;
  changeStatus: (ids: string[], status: string) => void;
}

interface ITodoProvider {
  children: ReactNode;
}

export const useTodoContext = () => useContext(todoStore);

export const TodoProvider = ({ children }: ITodoProvider) => {
  const store: ITodoStore = useLocalObservable(
    () =>
      ({
        filter: localStorage.getItem("filter") ?? "ALL",
        todos: localStorage.getItem("todos")
          ? JSON.parse(localStorage.getItem("todos")!)
          : ([
            {
              id: nanoid(),
              title: "'lala'",
              done: false
            }
          ] as ITodo[]),
        addTodo(title: string) {
          store.todos.push({
            id: nanoid(),
            title,
            done: false
          });
          localStorage.setItem("todos", JSON.stringify(store.todos));
        },
        removeTodo(id: string) {
          store.todos = store.todos.filter((todo) => todo.id !== id);
          localStorage.setItem("todos", JSON.stringify(store.todos));
        },
        toggleDone(id: string) {
          store.todos.map((todo) => {
            if (todo.id === id) {
              todo.done = !todo.done;
            }
          });
          localStorage.setItem("todos", JSON.stringify(store.todos));
        },
        show(filter: string) {
          switch (filter) {
            case "ALL":
              return toJS(store.todos);
            case "DONE":
              return toJS(store.todos.filter((todo) => todo.done));
            default:
              return toJS(store.todos);
          }
        },
        setFilter(filter: string) {
          this.filter = filter;
          localStorage.setItem("filter", filter);
        },
        deleteTodos(ids: string[]) {
          const updateTodos = store.todos.filter(
            (todo) => !ids.includes(todo.id)
          );
          if (updateTodos.length === 0) {
            store.todos = [];
          } else {
            store.todos = updateTodos;
          }
          localStorage.setItem("todos", JSON.stringify(updateTodos));
        },
        changeStatus(ids: string[], status: "DONE" | "ACTIVE") {
          const updateTodos = store.todos.map((todo) => {
            if (ids.includes(todo.id)) {
              todo.done = status === "DONE";
            }
            return todo;
          });
          localStorage.setItem("todos", JSON.stringify(updateTodos));
          return store.todos = updateTodos;
        }
      } as ITodoStore)
  );

  return <todoStore.Provider value={store}>{children}</todoStore.Provider>;
};
