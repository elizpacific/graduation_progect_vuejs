import {ref} from "vue";
import {useRouter} from "vue-router/dist/vue-router";
import http from "../http";

export default function useUsers(){

    const errors = ref([])
    const router = useRouter()

    const createUser = async (data) =>{
        errors.value = []

        try {
            await http.post('/api/v1/registration', data)
            await router.push({ name: 'products.index' })
        } catch (e) {
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
        createUser
    }
}