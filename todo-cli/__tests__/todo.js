/* eslint-disable no-undef */
const todoList = require('../todo');
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe('TodoList Testing Suites 🛸', () => {
  

  test("Should add new todo", () => {
    add({
      title: "New test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    add({
      title: "New test todo 2",
      completed: true,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    add({
      title: "New test todo 3",
      completed: true,
      dueDate: "2026-08-23",
    });
  
    // Check if item was actually added
    expect(all.length).toBe(3);
    expect(all[0].title).toBe("New test todo");
    
  });
  
  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
    markAsComplete(1);
    expect(all[1].completed).toBe(true);
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
