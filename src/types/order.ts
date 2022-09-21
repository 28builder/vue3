
export interface ListInt {
    userId: number,
    id: string,
    title: string,
    body: string
}

interface SelecttDateInt {
    title: string,
    body: string,
    page: number,
    count: number
}
export class InitData {
    selectData: SelecttDateInt = {
        title: '',
        body: '',
        page: 0,
        count: 0,
    }
    list: [ListInt][] = []
    dataList: ListInt[] = [] 
}