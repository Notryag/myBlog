## redux

applyMiddleware
 
hooks
+ Hook 需要在我们组件的最顶层调用

stateHooks
EffectHook
useContext // 获取context上下文
```JS
// stateHooks
const [count, setCount] = useState(0);
// 可以在useState中返回一个函数, 只会在初始化的时候进行确认
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});

// EffectHooks
useEffect(() => {
  document.title = `You clicked ${count} times`;
})
```
可以在useEffect中return一个函数,相当于 清除订阅函数
使用useEffect可以把不同生命周期的函数组合起来, 并且可以使用多个useEffect
userEffect 的第二个参数是数组

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
// 在retrun中返回函数用来清除订阅
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // 仅在 props.friend.id 发生变化时，重新订阅
```

可以不用this
class: this.state.count
hooks: count

### 使用useSelector useDispatch 替代connect
```jsx
import {connect} from 'dva'

const Home = props=>{
    // 获取数据
    const {user,loading,dispatch} = props

    // 发起请求
    useEffect(()=>{  dispatch({ type:'user/fetchUser',payload:{} }) },[])

    // 渲染页面
    if(loading) return <div>loading...</div>
    return <div>{user.name}<div>
}

export default connect(({loading,user})=>({
    loading:loading.effects['user/fetchUser'],
    user:user.userInfo
}))(Home)
```

```jsx
import {useDispatch,useSelector} from 'dva'

const Home = props=>{

    const dispatch = useDispatch()

    const loadingEffect = useSelector(state =>state.loading);
    const loading = loadingEffect.effects['user/fetchUser'];
    const user = useSelector(state=>state.user.userInfo)

    // 发起请求
    useEffect(()=>{ dispatch({ type:'user/fetchUser',payload:{} }) },[])

    // 渲染页面
    if(loading) return <div>loading...</div>
    return (  <div>{user.name}<div> )
}

export default Home
```
