// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (msg: string, ...args: any[]) => {
  import.meta.env.DEV && console.log(msg, ...args)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const error = (msg: string, ...args: any[]) => {
  import.meta.env.DEV && console.error(msg, ...args)
}


export const logger = {
  log,
  error,
}
