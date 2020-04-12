import Layout from "../../../components/Layout";
import Loader from "../../../components/Loader";
import LodgeView from "../../../components/LodgeView";
import { Lodge } from "../../../model/lodge";
import useData from "../../../utils/useData";

export default () => {
    const data = useData<Lodge[]>('/api/lodges');
    return <Layout title="Lodges">
        {!data
            ? <Loader />
            : data.map(lodge => <LodgeView lodge={lodge} key={lodge.id} />)}
    </Layout>
}