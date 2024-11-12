import { useBreakpointContext } from './contexts/BreakpointContext'

export const App = () => {
  const { breakpoint } = useBreakpointContext()

  return (
    <div>
      Current Breakpoint:
      {breakpoint}
    </div>
  )
}
