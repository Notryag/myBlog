#### queueJob 
```js
export function queueJob(job: SchedulerJob) {
  if (
    (!queue.length ||
      !queue.includes(
        job,
        isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
      )) &&
    job !== currentPreFlushParentJob
  ) {
    if (job.id == null) {
      queue.push(job)
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job)
    }
    queueFlush()
  }
}
```
1. 向队伍队列添加任务
2. 如果有id属性根据id大小排序
3. job会去重

`queuePreFlushCb` 优先级高于 `queueJob`,同时执行`queuePreFlushCb`的任务会在前面
[任务调度和nextTick](https://juejin.cn/post/6987710437651382280#heading-26)


任务分为 前置任务队列  任务队列 后置任务队列
通过`isFlushing` 和 `isFlushPending` 表示 正在执行 和 有待执行任务


`flushJobs` 中调用`flushPreFlushCbs` -> 处理queue 中任务 -> `flushPostFlushCbs`
`flushPreFlushCbs` 处理 `pendingPreFlushCbs` 中任务即前置任务
`flushPostFlushCbs` 处理 `pendingPostFlushCbs` 中后置任务
这3个任务大体都是循环然后执行任务队列中的任务

### nextTick
```js
export function nextTick<T = void>(
  this: T,
  fn?: (this: T) => void
): Promise<void> {
  const p = currentFlushPromise || resolvedPromise
  return fn ? p.then(this ? fn.bind(this) : fn) : p
}
```
nextTick就是直接把任务放在了当前任务的后面


> 微任务在dom渲染之前执行，宏任务在dom渲染之后执行。