import Router from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Title from '../../components/Title'
import ContentWrapper from '../../components/ContentWrapper'

const AdminPanel = () => {
    const user = useSelector(state => state.user)

    useEffect(() => {
        if(!user || !['admin', 'mod'].includes(user.admin)) { Router.push('/'); return }
    }, []) // eslint-disable-line

    return (
        <div className="AdminPanel md:grid grid-cols-4">
            <Title style="pink">Tạo chuyên mục</Title>
            <ContentWrapper style="pink">
                <div>

                </div>
            </ContentWrapper>

            <Title>Quản lý chuyên mục</Title>
            <ContentWrapper>
                <div>
                    Chuyen muc 1
                </div>
            </ContentWrapper>
        </div>
    )
}

export default AdminPanel