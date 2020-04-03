import Layout from "../../components/Layout"
import useData from "../../services/useData"
import { Lodge } from "../../model/lodge"

export default () => {
    const data = useData<Lodge[]>('/api/lodges');
    return <Layout title="Lodges">
        {JSON.stringify(data)}
    </Layout>
}