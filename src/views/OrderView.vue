<template>
    <div class="order-wrap">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="标题搜索">
                <el-input v-model="selectData.title" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item label="详情">
                <el-input v-model="selectData.body" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table border :data="list[selectData.page]" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="body" label="详情" />
        </el-table>
        <el-pagination @current-change="currentChange" layout="prev, pager, next" :total="selectData.count" />
    </div>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { InitData, ListInt } from '../types/order'
import { getList } from '../http/api'
 
export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        onMounted(() => {
            getList({page: data.selectData.page}).then(res => {
                console.log(res)
                // data.list = res || []
            })
            data.list = [[
                {
                    id: '1234',
                    title: '沈腾撕逼',
                    body: '孤星月球',
                    userId: 4567
                }
            ]]
            data.selectData.count = 80
        })
        const currentChange = (page: number) => {
            data.selectData.page = page
        }
        const sliceList = <T extends Record<string, unknown>>(arr: ListInt[], obj: T) => {
            for (let i=0; i < arr.length; i+=10) {
                let list2: any = arr.slice(i, i + 10)
                // data.list.push(list2)
            }
        }
        const onSubmit = () => {
            let arr: ListInt[] = []
            if(data.selectData.title || data.selectData.body) {
                if (data.selectData.title) {
                    arr = data.dataList.filter(v => v.title.indexOf(data.selectData.title) != -1)
                }
               if (data.selectData.body) {
                    arr = data.dataList.filter(v => v.title.indexOf(data.selectData.body) != -1)
               }
            } else {
                arr = data.dataList
            }
            data.selectData.count = arr.length
            sliceList(arr)
        }

        return {
            ...toRefs(data),
            currentChange,
            sliceList,
            onSubmit
        }
    },
})
</script>

<style lang="sass" scoped>

</style>