export type TodoItem = {
  id: string;
  userId: string;
  name: string;
  isDone: boolean;
  description: string;
  createdOn: Date;
  lastUpdated: Date;
};

export const defaultTodoItem: TodoItem = {
  id: "00000000-0000-0000-0000-000000000000",
  userId: "",
  name: "",
  isDone: false,
  description: "",
  createdOn: new Date(),
  lastUpdated: new Date(),
};
