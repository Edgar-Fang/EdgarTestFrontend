import {describe, expect, test} from "@jest/globals";
import ApiFactory from "@/app/api/apiFactory";
import {QueryBasicOrderDTO} from "@/app/api/NorthWindService";

const orderService = ApiFactory.getInstance().getService('orders');
describe('Order API Service', () => {
    test('queryBasicOrderGet呼叫成功', async () => {
        const response = await orderService.queryBasicOrderGet();
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBeTruthy();
        expect(response.data.length).toBeGreaterThan(0);
    });

    test('queryBasicOrderGet資料結構是否正確', async () => {
        const {data} = await orderService.queryBasicOrderGet();
        const firstOrder = data[0];

        expect(firstOrder).toHaveProperty('orderId');
        expect(firstOrder).toHaveProperty('orderDate');
        expect(firstOrder).toHaveProperty('customerName');
        expect(firstOrder).toHaveProperty('freight');
        expect(firstOrder).toHaveProperty('shipStatus');
    });

    test('queryBasicOrderGet 型別是否在預期內', async () => {
        const { data } = await orderService.queryBasicOrderGet();

        const isValid = (value: any, type: string): boolean =>
            value === undefined || value === null || typeof value === type;

        const isQueryBasicOrderDTO = (order: any): boolean =>
            isValid(order.orderId, 'number') &&
            isValid(order.customerName, 'string') &&
            isValid(order.freight, 'number') &&
            isValid(order.shipStatus, 'string');

        expect(data.length).toBeGreaterThan(0);
        expect(data.every(isQueryBasicOrderDTO)).toBeTruthy();
    });
});