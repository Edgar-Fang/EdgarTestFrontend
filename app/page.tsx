import ApiFactory from "@/app/api/apiFactory";
import OrderTable from "@/app/Order/OrderTable";

const OrderList = async () => {
    try {
        const orderService = ApiFactory.getInstance().getService('orders');
        const {status, statusText, data} = await orderService.queryBasicOrderGet();

        if (status === 200) {
            return (
                <div>
                    <OrderTable orders={data}/>
                </div>
            )
        }
    } catch (error) {
        return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
    }
}


export default function Home() {
    return (
        <div>
            <OrderList/>
        </div>
    )
}