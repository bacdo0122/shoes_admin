import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { Link } from 'react-router-dom';
import queryString from 'query-string'

import orderAPI from '../Api/orderAPI';
import Pagination from '../Shared/Pagination'
import Search from '../Shared/Search'

const socket = io('http://localhost:8000/', {
    transports: ['websocket'], jsonp: false
});
socket.connect();

function Order(props) {
    const [filter, setFilter] = useState({
        page: '1',
        limit: '4',
    })

    const [order, setOrder] = useState([])
    const [totalPage, setTotalPage] = useState()
    const [note, setNote] = useState([])

    useEffect(() => {
        const query = '?' + queryString.stringify(filter)

        const fetchAllData = async () => {
            const od = await orderAPI.getAPI(query)
            console.log(od)
            setTotalPage(od.totalPage)
            setOrder(od.orders)


        }

        fetchAllData()
    }, [filter])

    //Hàm này dùng để nhận socket từ server gửi lên
    useEffect(() => {

        //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_order
        socket.on('receive_order', (data) => {
            setNote(data)

            setTimeout(() => {
                window.location.reload()
            }, 4000)
        })


    }, [])

    const onPageChange = (value) => {
        setFilter({
            ...filter,
            page: value
        })
    }
    console.log("order:", order)
    return (
        <div className="page-wrapper">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Đơn hàng</h4>
                                {
                                    note != "" ? (<h5>{note}. Trang sẽ load lại sau 4s</h5>) : (<div></div>)
                                }
                                <div className="table-responsive mt-3">
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>Mã</th>
                                                <th>Tên</th>
                                                <th>Email</th>
                                                <th>Số điện thoại</th>
                                                <th>Địa chỉ</th>
                                                <th>Tình trạng</th>
                                                <th>Tổng tiền</th>
                                                <th>Tình trạng thanh toán</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                order && order.map((value, index) => (
                                                    <tr key={index}>
                                                        <td className="name">{value._id}</td>
                                                        <td className="name">{value.id_user && value.id_user.fullname}</td>
                                                        <td className="name">{value.id_user && value.id_user.email}</td>
                                                        <td className="name">{value.phone && value.phone}</td>
                                                        <td className="name">{value.address}</td>
                                                        <td>
                                                            {(() => {
                                                                switch (value.status) {
                                                                    case "1": return "Đang xử lý";
                                                                    case "2": return "Đã xác nhận";
                                                                    case "3": return "Đang giao";
                                                                    case "4": return "Hoàn thành";
                                                                    default: return "Đơn bị hủy";
                                                                }
                                                            })()}
                                                        </td>
                                                        <td className="name">{value.total}</td>
                                                        <td className="name">{value.pay === true ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link to={"/order/detail/" + value._id} className="btn btn-info mr-1">Detail</Link>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination filter={filter} onPageChange={onPageChange} totalPage={totalPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Order;