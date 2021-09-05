import Router from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Title from '../../components/Title'

const AdminPanel = () => {
    const user = useSelector(state => state.user)

    useEffect(() => {
        if(!user || !['admin', 'mod'].includes(user.admin)) { Router.push('/'); return }
    }, []) // eslint-disable-line

    return (
        <div className="AdminPanel md:grid grid-cols-4">
            <Title style="pink">Quản lý chuyên mục</Title>
            <div className="bg-pink-50 p-3 shadow">
                <div>
                    Chuyen muc 1
                </div>
                <div>
                    Chuyen muc 1
                </div>
                <div>
                    Chuyen muc 1
                </div>
            </div>
        </div>
    )
}

export default AdminPanel