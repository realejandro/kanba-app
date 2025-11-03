import { BoardLayout } from '../../layouts/BoardLayout'
import { ClientsMetrics } from './components/ClientsMetrics'

const AnalyticsPage = () => {
    
  return (
    <BoardLayout children={ <ClientsMetrics/>}/>
  )
}

export default AnalyticsPage