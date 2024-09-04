import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string'

import userAPI from '../Api/userAPI';
import Pagination from '../Shared/Pagination'
import Search from '../Shared/Search'

function UserCus(props) {
    const [filter, setFilter] = useState({
        permission: '66bbf2af196b7135d3146369',
        page: '1',
        limit: '4',
        search: '',
        status: true
    })

    const [users, setUsers] = useState([])
    const [totalPage, setTotalPage] = useState()


    useEffect(() => {
        const query = '?' + queryString.stringify(filter)
        const fetchAllData = async () => {
            const response = await userAPI.getAPI(query)
            setUsers(response.users)
            setTotalPage(response.totalPage)
        }
        fetchAllData()
    }, [filter])


    const onPageChange = (value) => {
        setFilter({
            ...filter,
            page: value
        })
    }

    const handlerSearch = (value) => {
        setFilter({
            ...filter,
            page: '1',
            search: value
        })
    }

    const handleDelete = async (value) => {
        const query = '?' + queryString.stringify({ id: value._id })

        const response = await userAPI.delete(query)

        if (response.msg === "Thanh Cong") {
            setFilter({
                ...filter,
                status: !filter.status
            })
        }
    }

    return (
        <div className="page-wrapper">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Khách hàng</h4>
                                <Search handlerSearch={handlerSearch} />

                                <Link to="/customer/create" className="btn btn-primary my-3">Tạo mới</Link>

                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên</th>
                                                <th>Email</th>
                                                <th>Số điện thoại</th>
                                                <th>Giới tính</th>
                                                <th>Phân quyền</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                users && users.map((value, index) => (
                                                    <tr key={index}>
                                                        <td>{value._id}</td>
                                                        <td>{value.fullname}</td>
                                                        <td>{value.email}</td>
                                                        <td>{value.phone}</td>
                                                        <td>{value.gender}</td>
                                                        <td>{value.id_permission.permission}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link to={"user/update/" + value._id} className="btn btn-success mr-1">Cập nhật</Link>

                                                                <button type="button" style={{ cursor: 'pointer', color: 'white' }} onClick={() => handleDelete(value)} className="btn btn-danger" >Xóa</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                </div>
                                <Pagination filter={filter} onPageChange={onPageChange} totalPage={totalPage} />
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default UserCus;