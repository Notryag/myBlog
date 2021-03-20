new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('value')
  }, 1000)
}).then(
  (success) => {
    console.log(success)
  }
)
