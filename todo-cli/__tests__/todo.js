/* eslint-disable no-undef */
const todoList = require('../todo');
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe('TodoList Testing Suites 🛸', () => {
  // Set up a new todo before running the test cases.
  test("Should add a new todo", () => {
    const initialLength = todo.all.length;
    todo.add({ title: "New Todo", completed: false, dueDate: today });
    expect(todo.all.length).toBe(initialLength + 1); // Expect the length to increase by 1
    expect(todo.all[initialLength].title).toBe("New Todo");

  });
  
  test("Should mark a todo as completed", () => {
    todo.add({ title: "Mark as complete", completed: false, dueDate: today });
    expect(todo.all[0].completed).toBe(false); // Initially not completed
    todo.markAsComplete(0); // Mark it as complete
    expect(todo.all[0].completed).toBe(true); // Now it should be completed
  });


  test('Retrieval of overdue items', () => {
    const overdueItems = overdue();
    expect(
      overdueItems.every((item) => new Date(item.dueDate) < new Date())
    ).toBe(true);
  });

  test('Retrieve due today items', () => {
    const dueTodayItems = dueToday();
    const today = new Date().toLocaleDateString('en-CA');
    expect(dueTodayItems.every((item) => item.dueDate === today)).toBe(true);
  });

  test('Retrieve due later items', () => {
    const dueLaterItems = dueLater();
    expect(
      dueLaterItems.every((item) => new Date(item.dueDate) > new Date())
    ).toBe(true);
  });
});
