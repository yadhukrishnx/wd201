/* eslint-disable no-undef */
const todoList = require('../todo');
const { all, markAsComplete, add, overdue, dueToday, dueLater, today } =
  todoList();
describe('TodoList Testing Suites 🛸', () => {
   beforeAll(()=>{
        add({
          title:"Test todo",
          completed: false,
          dueDate: new Date().toLocaleDateString("en-CA")
        }
    );
    });
    test("Should add new todo",()=>{
        const todoItemsCout=all.length;
        add(
            {
                title:"Test todo",
                completed: false,
                dueDate: new Date().toLocaleDateString("en-CA")
            }
        );
        expert(all.length).toBe(todoItemsCount+1);
    });
    test("Should mark a todo as complete",()=>{
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
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
