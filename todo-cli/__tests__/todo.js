/* eslint-disable no-undef */
const todoList = require('../todo');
const { all, markAsComplete, add, overdue, dueToday, dueLater, today } =
  todoList();
describe('TodoList Testing Suites 🛸', () => {

  test('Should be able to add new todo', () => {
    const todoItemsCount = all.length;
    add({
      title: 'Test Todo 2',
      completed: false,
      dueDate: new Date().toLocaleDateString('en-CA'),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });
  test('Marking the todo as Completed', () => {
    const todoItemsCount = all.length;
    markAsComplete(todoItemsCount - 1);
    expect(all[todoItemsCount - 1].completed).toBe(true);
  });
  test('Retrival  OverDue Item', () => {
    const overdueItems = overdue();
    expect(
      overdueItems.every((item) => new Date(item.dueDate) < new Date())
    ).toBe(true);
  });
  test('Retrive Due today item', () => {
    const duetodayItems = dueToday();
    const today = new Date().toLocaleDateString('en-CA');
    expect(duetodayItems.every((item) => item.dueDate === today)).toBe(true);
  });
  test('Retrive due later items', () => {
    const dueLaterItems = dueLater();
    expect(
      dueLaterItems.every((item) => new Date(item.dueDate) > new Date())
    ).toBe(true);
  });
});
