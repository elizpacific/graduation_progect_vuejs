import { ref } from 'vue'
import http from '../http.js'
import { useRouter} from 'vue-router'
import axios from "axios";

export default function useOrders() {
    const order = ref([])
    const orders = ref([])
    const user = ref([])
    const token = localStorage.getItem('user-token')

    const errors = ref([])
    const router = useRouter()

    const getOrders = async (id) => {
        let response = await http.get(`/api/v1/orders/list/${id}`)
        orders.value = response.data.data
    }

    const createOrder = async (data) => {
        errors.value = []

        try {
            await http.post('/api/v1/orders/create', data)
            await router.push({ name: 'products.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value.push(e.response.data.errors[key][0]);
                }
            }
        }
    }

    const userByToken = async(token) => {
        errors.value = []

        try {
            let response = await http.get(`api/v1/orders/token/${token}`)
            user.value = response.data.data
        }catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value.push(e.response.data.errors[key][0]);
                }
            }
        }
    }

    return {
        errors,
        router,
        order,
        orders,
        token,
        user,
        getOrders,
        createOrder,
        userByToken
    }
}