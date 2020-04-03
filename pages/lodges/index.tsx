import Layout from "../../components/Layout"
import useData from "../../services/useData"
import { Lodge } from "../../model/lodge"
import { CircularProgress } from "@material-ui/core";
import LodgeView from "../../components/LodgeView";

export default () => {
    const data = useData<Lodge[]>('/api/lodges');
    return <Layout title="Lodges">
        {!data
            ? <CircularProgress />
            : data.map(lodge => <LodgeView lodge={lodge} key={lodge.id} />)}
    </Layout>
}