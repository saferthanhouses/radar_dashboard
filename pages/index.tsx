import CustomHead from "../components/CustomHead";
import * as Styles from '../styles'

function Dashboard(){
    return (
        <div style={{padding: Styles.defaultPadding}}>
            <CustomHead/>
            <h1>Welcome To The Events Dashboard</h1>
        </div>
    )
}

export default Dashboard;
