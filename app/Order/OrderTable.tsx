'use client';

import {DataGrid, GridColDef, GridRowParams, MuiEvent} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {QueryBasicOrderDTO, UpdateOrderCustomerNameDTO} from "@/app/api/NorthWindService";
import {Dispatch, SetStateAction, Suspense, useCallback, useEffect, useState} from "react";
import {Box, Button, MenuItem, Modal, Select, Stack, TextField, Typography} from "@mui/material";
import ApiFactory from "@/app/api/apiFactory";
import {useAsyncFn, useEffectOnce} from "react-use";
import {Backdrop, CircularProgress} from '@mui/material';
import {useRouter} from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';


const orderService = ApiFactory.getInstance().getService('orders');
const columns: GridColDef[] = [
    {
        field: 'orderId',
        headerName: '訂單編號',
        width: 100
    },
    {
        field: 'orderDate',
        headerName: '訂購日期',
        width: 130,
        valueFormatter: (params) => {
            // 假設 params.value 是個 Date 物件
            return new Date(params).toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        }
    },
    {
        field: 'customerName',
        headerName: '客戶名稱',
        width: 130
    },
    {
        field: 'formattedFreight',
        headerName: '運費',
        width: 100,
    },
    {
        field: 'shippedDate',
        headerName: '出貨日期',
        width: 130,
        valueFormatter: (params) => {
            // 假設 params.value 是個 Date 物件
            return new Date(params).toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        }
    },
    {
        field: 'shipStatus',
        headerName: '出貨狀態',
        width: 100,
        renderCell: (params) => (
            <span style={{
                color: params.value === '已出貨' ? 'green' : 'orange'
            }}>
        {params.value}
      </span>
        )
    }
];

interface OrderTableProps {
    orders: QueryBasicOrderDTO[];
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

interface DataGridWithModalProps {
    handleClose: () => void;
    orderId: string;
    customerIdState: {
        customerId: string;
        setCustomerId: Dispatch<SetStateAction<string>>;
    }
}

const DataGridWithModal = ({handleClose, orderId, customerIdState}: DataGridWithModalProps) => {
    const router = useRouter();


    const [{loading, error}, updateCustomerName] = useAsyncFn(async () => {
        const reqBody: UpdateOrderCustomerNameDTO = {
            customerName: customerIdState.customerId
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
        await orderService.updateCustomerNameOrderIdPut(
            Number(orderId),
            reqBody, // UpdateOrderCustomerNameDTO
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        handleClose();
        router.refresh();
    }, [customerIdState.customerId]);


    return (
        <>
            <Modal
                open={true}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" sx={{mb: 2}}>
                        編輯資料:{orderId}
                    </Typography>

                    <TextField
                        fullWidth
                        label="客戶名稱"
                        value={customerIdState.customerId}
                        onChange={(e) => customerIdState.setCustomerId(e.target.value)}
                        sx={{mb: 3}}
                    />

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                        >
                            取消
                        </Button>
                        <Button
                            variant="contained"
                            onClick={updateCustomerName}
                        >
                            確認
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.modal + 1
                }}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
};

interface AddOrderProps {
    addIsOpenState: {
        isAddOrderOpen: boolean;
        setIsAddOrderOpen: Dispatch<SetStateAction<boolean>>;
    }
}

const AddOrderModal = ({addIsOpenState}: AddOrderProps) => {
    const router = useRouter();
    const {isAddOrderOpen, setIsAddOrderOpen} = addIsOpenState;

    const [{loading, error}, addOrder] = useAsyncFn(async () => {
        setIsAddOrderOpen(false);
        router.refresh();
    }, []);

    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedShipper, setSelectedShipper] = useState('');

    const [{value: dropDropDownListData}, queryDropDownList] = useAsyncFn(async () => {
        try {
            const {data, status} = await orderService.queryOrderAddDropDownListsGet();
            if (status === 200) {
                const {customers, shippers, employees} = data;
                if (customers && customers.length > 0) {
                    setSelectedCustomer(customers[0].id ?? '');
                }
                if (shippers && shippers.length > 0) {
                    setSelectedCustomer(shippers[0].id ?? '');
                }
                if (employees && employees.length > 0) {
                    setSelectedCustomer(employees[0].id ?? '');
                }
                return data;
            }

        } catch (error) {
            console.error(`${JSON.stringify(error)}`);
        }
    }, []);

    useEffectOnce(() => {
        queryDropDownList();
    })


    return (
        <div>
            <Modal
                open={isAddOrderOpen}
                onClose={() => setIsAddOrderOpen(false)}
            >
                <Box sx={{
                    ...modalStyle,
                    width: '400px',  // 調整 modal 的寬度
                    minWidth: '300px'
                }}>
                    <Typography variant="h6" component="h2" sx={{mb: 2}}>
                        新增資料
                    </Typography>
                    客戶選擇:
                    <Select
                        sx={{
                            width: '100%',  // 讓 Select 填滿整個容器寬度
                            mb: 2  // 加一點底部 margin
                        }}
                        value={selectedCustomer}
                    >
                        {dropDropDownListData?.customers?.slice(0, 10).map((option) => (
                            <MenuItem key={option.id} value={option.id ?? ''}>
                                {option.id}
                            </MenuItem>
                        ))}
                    </Select>
                    業務選擇:
                    <Select
                        sx={{
                            width: '100%',  // 讓 Select 填滿整個容器寬度
                            mb: 2  // 加一點底部 margin
                        }}
                        value={selectedEmployee}
                    >
                        {dropDropDownListData?.employees?.slice(0, 10).map((option) => (
                            <MenuItem key={option.id} value={option.fullName ?? ''}>
                                {option.fullName}
                            </MenuItem>
                        ))}
                    </Select>
                    運輸選擇:
                    <Select
                        sx={{
                            width: '100%',  // 讓 Select 填滿整個容器寬度
                            mb: 2  // 加一點底部 margin
                        }}
                        value={selectedShipper}
                    >
                        {dropDropDownListData?.shippers?.slice(0, 10).map((option) => (
                            <MenuItem key={option.id} value={option.companyName ?? ''}>
                                {option.companyName}
                            </MenuItem>
                        ))}
                    </Select>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={() => setIsAddOrderOpen(false)}
                        >
                            取消
                        </Button>
                        <Button
                            variant="contained"
                            onClick={addOrder}
                        >
                            確認
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
};


export default function OrderTable({orders}: OrderTableProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

    const handleClose = () => setIsOpen(false);
    const handleRowClick = (params: GridRowParams,
                            event: MuiEvent<React.MouseEvent>
    ) => {
        event.preventDefault();
        const {orderId: nowSelectedOrderId, customerName: nowSelectedCustomerName} = params.row;

        setSelectedOrderId(nowSelectedOrderId);
        setCustomerId(nowSelectedCustomerName);
        setIsOpen(true);
    };

    const handleAddOrderModalOpen = useCallback(() => {
        setIsAddOrderOpen(true);
    }, [])


    return (
        <Paper sx={{height: '100%', width: '100%'}}>
            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    startIcon={<AddIcon/>}*/}
            {/*    sx={{*/}
            {/*        backgroundColor: '#1976d2',*/}
            {/*        '&:hover': {*/}
            {/*            backgroundColor: '#1565c0'*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    onClick={handleAddOrderModalOpen}*/}
            {/*>*/}
            {/*    新增訂單*/}
            {/*</Button>*/}
            <AddOrderModal addIsOpenState={{isAddOrderOpen, setIsAddOrderOpen}}/>

            <Suspense fallback={<CircularProgress/>}>
                <DataGrid
                    getRowId={(row) => row.orderId}
                    rows={orders}
                    onRowClick={handleRowClick}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 10}, // 改用存在的數值
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}  // 必須包含 10
                    sx={{border: 0}}
                />
                {
                    isOpen && (
                        <DataGridWithModal customerIdState={{customerId, setCustomerId}} orderId={selectedOrderId}
                                           handleClose={handleClose}/>
                    )
                }
            </Suspense>
        </Paper>
    );
}
