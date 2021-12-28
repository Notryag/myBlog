
### 生命周期
```js
class Component extends React.Component {
  // 替换 `componentWillReceiveProps` ，
  // 初始化和 update 时被调用
  // 静态函数，无法使用 this
  static getDerivedStateFromProps(nextProps, prevState) {}
  // 判断是否需要更新组件
  // 可以用于组件性能优化
  shouldComponentUpdate(nextProps, nextState) {}
  // 组件被挂载后触发
  componentDidMount() {}
  // 替换 componentWillUpdate
  // 可以在更新之前获取最新 dom 数据
  getSnapshotBeforeUpdate() {}
  // 组件更新后调用
  componentDidUpdate() {}
  // 组件即将销毁
  componentWillUnmount() {}
  // 组件已销毁
  componentDidUnMount() {}
}
```



react是粗颗粒度更新的, 而vue可以精细到组件.因为react没有响应式的收集依赖。

react只能递归把所有子组件更细一遍。不论子组件的props有没有改变
vue每个组件都有自己的watcher，掌管了当前组件的更新，但并不会管childComponent的更新。

React把组件当成一个个的pure function，state是内部的状态。props是外来的状态（参数），任何一方改变了都需要重新渲染



react是基于immutable 的设计
> 在 React 的语境下，这种设计带来的极大的遍历。即如果我们想要知道两个数据是否相同，直接比较他们的 reference 就行了，没必要再去做麻烦的深度递归比较。
这个是不对的：
```js
const [todos, setTodos] = useState(todosArray);
const onClick = () => {
    todos[2].completed = true;
    setTodos(todos);
}
```

应该是：
```js
const [todos, setTodos] = useState(todosArray);

const onClick = () => {
    const updatedTodos = todos.map(todo => {
        if (todo === selectedTodo) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    setTodos(tods);
}
```
时刻保证你set进去的是一个新的对象

### 不同的心智模型
### R
React在每一次点击后,都会得到一个新的函数式组件
```js
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1> You clicked {count} times</h1>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </>
    )
}
```
```js
// first render
function Counter() {
    const count = 0;
    // ...
    return <h1>You clicker {count} times</h1>
}

// second render
function Counter() {
    const count = 1;
    // ...
    return <h1>You clicker {count} times</h1>
}

// third render
function Counter() {
    const count = 2;
    // ...
    return <h1>You clicker {count} times</h1>
}
```


```js
const [count, setCount] = useState(0);

function increment() {
    setCount(count + 1);
}

function handleClick() {
    increment();
    increment();
    increment();
}
```
**React 会在组件内所有事件触发完成后再进行批量更新**,所以`setCount`只是重复setCount(1)
如果修改需要`setCount(c => c + 1);`


## 为什么Hooks有这么多规则

+ 不要在循环、条件语句或嵌套函数中使用 Hooks
+ 只在 React Functional Component 中使用 Hooks

> 简单来说, 就是react hooks在渲染的时候维护了一个链表, 来记录useState和useEffect的位置和值, (这也是state不能使用if else的原因, 因为可能会导致链表中state useEffect的顺序错乱, 从而不能获取到正确的数值

```js
const states = []
const setStates = []
let cursor = 0
// 在调用一次 setState(0) 之后
states = [name]
setStates = [setName]
```
states 和setStates 是一一对应的

### 闭包陷阱
```js
function MyComponent() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setinterval(() => {
            setCount(count + 1);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return <h1>{count}</h1>
}
```

在每次state更新时, 链表从头开始重新渲染, 但是由于上面示例中useEffect没有依赖任何state, 所以只有在第一次渲染的时候才会触发, setCount渲染更新时, useEffect里面的回调函数并没有触发 因此里面的setInterval里面的count还是初始化时的值,并没有获取到最新的. 这就是闭包陷阱

useEffect的第二个参数,也是告诉react我们使用了哪些值

应该是:
```js
function MyComponent() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1);
        }, 1000)
        return () => clearInterval(id)
    }, [])
}
```