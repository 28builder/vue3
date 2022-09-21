<template>
    <div class="login-box">
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="loginForm"
        >
            <h1>后台管理系统</h1>
            <el-form-item label="账号：" prop="userName">
                <el-input v-model="loginForm.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：" prop="userName">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(loginFormRef)"
                    >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import type { FormInstance } from 'element-plus'
import { initData } from '../types/login'
import { login } from '../http/api'

import { useRouter } from 'vue-router'
import { useStore } from '../store'

export default defineComponent({
    setup () {
        const data = reactive(new initData())
        const router = useRouter()
        const store = useStore()
        // store.commit('')
        console.log(store.getters.getName)
        const rules = {
                userName: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 6, max: 24, message: '账号长度需要再6-24之间', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 24, message: '密码长度需要再6-24之间', trigger: 'blur' },
                ]
            }
        const submitForm = (loginFormRef?: FormInstance) => {
            loginFormRef?.validate((valid:boolean) => {
                    if (valid) {
                        console.log('submit!')
                        login(data.loginForm).then(res => {
                            console.log(res)
                            localStorage.setItem('token', res.data.token)
                            router.push('/')
                        })
                        // router.push('/')
                    } else {
                        console.log('error submit!')
                        return false
                    }
            })
        }

        // type H<T> = <T: *>(input: T) => T;
        // const h:H<*> = i => i;
    
        // console.log(a,b,c)
        let getArray = < T, >(items: T[]): T[] => {
            return new Array< T >().concat(items)
        }

        let myNumArr = getArray<number>([100, 200, 300]);
        let myStrArr = getArray<string>(["Hello","World"]);
        myNumArr.push(1)
        console.log(myNumArr, myStrArr)

        return {
            ...toRefs(data),
            rules,
            submitForm,
            getArray
        }
    }
})
</script>

<style lang="scss" scoped>
.login-box {
    background: #fefefe;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 200px;
    .loginForm {
        width: 450px;
        padding: 20px;
        margin: 0 auto;
        h1 {
            text-align: center;
            padding-bottom: 10px;
        }
    }
}
</style>