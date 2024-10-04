/* eslint-disable no-undef */
const todoList = require('../todo');
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe('TodoList Testing Suites 🛸', () => {
  // Set up a new todo before running the test cases.
  beforeAll(() => {
    add({
      title: 'Test todo',
      completed: false,
      dueDate: new Date().toLocaleDateString('en-CA'),
    });
  });
  
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "New test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  
    // Check if item was actually added
    expect(all.length).toBe(todoItemsCount + 1);
    expect(all[all.length - 1].title).toBe("New test todo"); // Additional check to confirm the title
    expect(all[all.length - 1].completed).toBe(false); // Additional check to confirm the completed status
  });
  
  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
  
    // Check if the status was actually updated
    expect(all[0].completed).toBe(true);
    expect(all.some((todo) => todo.completed === true)).toBe(true); // Confirm that some todo is completed
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
