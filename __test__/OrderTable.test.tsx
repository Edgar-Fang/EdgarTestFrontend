import { render, screen} from '@testing-library/react';
import OrderTable from "@/app/Order/OrderTable";
import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import ApiFactory from "@/app/api/apiFactory";
import {QueryBasicOrderDTO} from "@/app/api/NorthWindService";
import userEvent from '@testing-library/user-event';
import {TestWrapper} from "@/__test__/test-setup";

const orderService = ApiFactory.getInstance().getService('orders');


const mockRefresh = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: mockRefresh
    })
}));
describe('OrderTable Component', () => {
    const mockOrders: Array<QueryBasicOrderDTO> = [
        {
            orderId: 10248,
            orderDate: new Date("1996-07-04"),
            customerName: "VINET",
            freight: 32.38,
            shippedDate: new Date("1996-07-04"),
            formattedFreight: "NT$32.38",
            shipStatus: "已出貨"
        }
    ];

    // 每個測試前重置 mock
    beforeEach(() => {
        jest.clearAllMocks();
        mockRefresh.mockClear();
    });

    test('應該正確渲染表格的所有欄位標題', () => {
        render(
            <TestWrapper>
                <OrderTable orders={mockOrders}/>
            </TestWrapper>
        )
        expect(screen.getByText('訂單編號')).toBeDefined()
        expect(screen.getByText('訂購日期')).toBeDefined()
        expect(screen.getByText('客戶名稱')).toBeDefined()
        expect(screen.getByText('運費')).toBeDefined()
        expect(screen.getByText('出貨日期')).toBeDefined()
        expect(screen.getByText('出貨狀態')).toBeDefined()
    })

    test('應該正確顯示單筆訂單的完整資訊', async () => {
        const response = await orderService.queryBasicOrderGet();
        expect(response.status).toBe(200);

        render(
            <TestWrapper>
                <OrderTable orders={response.data}/>
            </TestWrapper>
        )

        const allCells = screen.getAllByRole('gridcell', {
            name: (content, element) => {
                return element.getAttribute('data-field') === 'orderId';
            }
        });
        expect(allCells.every(cell => /^\d{5}$/.test(cell.textContent!))).toBe(true);

        // 驗證訂購日期
        const orderDateCells = screen.getAllByRole('gridcell', {
            name: (content, element) => {
                return element.getAttribute('data-field') === 'orderDate';
            }
        });

        // 驗證出貨日期
        const shipDateCells = screen.getAllByRole('gridcell', {
            name: (content, element) => {
                return element.getAttribute('data-field') === 'shippedDate';
            }
        });
        const dateRegex = /^\d{4}\/(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12]\d|3[01])$/;

        expect(orderDateCells.every(cell => dateRegex.test(cell.textContent ?? ''))).toBe(true);
        expect(shipDateCells.every(cell => dateRegex.test(cell.textContent ?? ''))).toBe(true);

    })

    test('應該在點擊行時打開 Modal', async () => {
        const {data} = await orderService.queryBasicOrderGet();

        render(
            <TestWrapper>
                <OrderTable orders={data}/>
            </TestWrapper>
        );

        const cell = screen.getAllByRole('gridcell', {
            name: (content, element) => element.getAttribute('data-field') === 'orderId'
        })[0];

        await userEvent.click(cell);

        // 檢查 Modal 是否打開
        expect(screen.getByText(/編輯資料:.+/)).toBeDefined();
    });
});