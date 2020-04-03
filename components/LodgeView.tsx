import { Lodge } from "../model/lodge";
import lodges from "../pages/admin/lodges";

export default ({ lodge }: { lodge: Lodge }) => {
    return <div>
        <h2>{lodge.name}</h2>
        <div>Occupancy: {lodge.occupancy}</div>
        <div>Prefer Students: {lodge.preferStudents ? "yes" : "no"}</div>
    </div>;
}