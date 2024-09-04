import React, { useState, useContext, useEffect } from 'react';
import {
    NavLink,
    Redirect
} from "react-router-dom";
import { AuthContext } from '../context/Auth'

function Menu() {
    const { user, jwt } = useContext(AuthContext);

    const [menu, setMenu] = useState([
        {
            item: "Customer",
            label: "Khách hàng",
            permission: "Admin"
        },
        {
            item: "Coupon",
            label: "Mã khuyến mãi",
            permission: "Admin"
        },
        {
            item: "Product",
            label: "Sản phẩm",
            permission: "Admin"
        },
        {
            item: "Sale",
            label: "Sản phẩm giảm giá",
            permission: "Admin"
        },
        {
            item: "Category",
            label: "Thể loại",
            permission: "Admin"
        },
        {
            item: "Order",
            label: "Đơn hàng",
            permission: "Admin"
        },
        {
            item: "ConfirmOrder",
            label: "Xác thực đơn hàng",
            permission: "Admin"
        },
        {
            item: "Delivery",
            label: "Đang giao",
            permission: "Admin"
        },
        {
            item: "ConfirmDelivery",
            label: "Xác thực giao hàng",
            permission: "Admin"
        },
        {
            item: "CompletedOrder",
            label: "Đơn hàng đã hoàn thành",
            permission: "Admin"
        },
        {
            item: "CancelOrder",
            label: "Đơn hàng bị hủy",
            permission: "Admin"
        },
        // {
        //     item: "User",
        //     permission: "Admin"
        // },
        {
            item: "Permission",
            label: "Phân quyền",
            permission: "Admin"
        }
        // "Category", ,
        // "Permission",
        // "User",
        // "Order",
        // "ConfirmOrder",
        // "Delivery",
        // "ConfirmDelivery",   
        // "CompletedOrder",
        // "CancelOrder"
    ])
    let { pathname } = window.location;
    return (
        <div>
            {
                jwt && user ?
                    (
                        <aside className="left-sidebar" data-sidebarbg="skin6">
                            <div className="scroll-sidebar" data-sidebarbg="skin6">
                                <nav className="sidebar-nav">
                                    <ul id="sidebarnav">

                                        <li className="list-divider"></li>

                                        <li className="nav-small-cap"><span className="hide-menu">Thành phần</span></li>


                                        <li className="sidebar-item"> <a className="sidebar-link has-arrow" href="#"
                                            aria-expanded="false"><i data-feather="grid" className="feather-icon"></i><span
                                                className="hide-menu">Bảng </span></a>
                                            <ul aria-expanded="false" className="collapse  first-level base-level-line">
                                                {
                                                    menu && menu.map((item, index) => (
                                                        (
                                                            <li className="sidebar-item active" key={index}>
                                                                {
                                                                    item.permission === user.id_permission.permission ?
                                                                        (
                                                                            <NavLink to={"/" + item.item.toLowerCase()} className="sidebar-link">
                                                                                {item.label}
                                                                            </NavLink>
                                                                        ) :
                                                                        (
                                                                            <div></div>
                                                                        )
                                                                }
                                                            </li>
                                                        )
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </aside>
                    ) :
                    (
                        <Redirect to="/" />
                    )
            }
        </div>


    );
}

export default Menu;