import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
export interface LofinFormInt {
    userName: string,
    password: string
}

export class initData {
    loginForm: LofinFormInt = {
        userName: '大神',
        password: ''
    }
    loginFormRef = ref<FormInstance>()||{}
}

