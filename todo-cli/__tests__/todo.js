/* eslint-disable no-undef */
const todoList = require('../todo');
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe('TodoList Testing Suites 🛸', () => {
  // Set up a new todo before running the test cases.
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Should add new todo", () => {
    // Get the initial count of todos
    const todoItemsCount = all.length;
    add({
      title: "New test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    // Ensure the count has increased by 1
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    // Ensure the first todo is not complete
    expect(all[0].completed).toBe(false);
    // Mark the first todo as complete
    markAsComplete(0);
    // Ensure the first todo is now marked as complete
    expect(all[0].completed).toBe(true);
  });

  test('Retrieval of overdue items', () => {
    const overdueItems = overdue();
    expect(overdueItems.every((item) => new Date(item.dueDate) < new Date())).toBe(true);
  });

  test('Retrieve due today items', () => {
    const dueTodayItems = dueToday();
    const today = new Date().toLocaleDateString('en-CA');
    expect(dueTodayItems.every((item) => item.dueDate === today)).toBe(true);
  });

  test('Retrieve due later items', () => {
    const dueLaterItems = dueLater();
    expect(dueLaterItems.every((item) => new Date(item.dueDate) > new Date())).toBe(true);
  });
});
