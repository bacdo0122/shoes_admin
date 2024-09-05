import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import queryString from 'query-string'
import isEmpty from 'validator/lib/isEmpty'
import categoryAPI from '../Api/categoryAPI'

function UpdateCategory(props) {
    const [id] = useState(props.match.params.id)
    const [name, setName] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const { handleSubmit } = useForm();
    const [gender] = useState(["male", "female"])
    const [genderChoose, setGenderChoose] = useState('');
    useEffect(() => {
        const fetchAllData = async () => {
            const ct = await categoryAPI.details(id)
            console.log(ct)
            setName(ct.category);
        }

        fetchAllData()
    }, [])

    const validateAll = () => {
        let msg = {}
        if (isEmpty(name)) {
            msg.name = "Tên không được để trống"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const handleUpdate = () => {

        const isValid = validateAll();
        if (!isValid) return
        console.log(name)
        updatecategory();
    }

    const updatecategory = async () => {
        const query = '?' + queryString.stringify({ id: id, name: name, gender: genderChoose })
        const response = await categoryAPI.update(query)
        setValidationMsg({ api: response.msg })

    }
    return (
        <div className="page-wrapper">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                {/* <h4 className="card-title">Update Category</h4> */}
                                <h4 className="card-title">Cập nhật thể loại</h4>
                                {
                                    validationMsg.api === "Bạn đã update thành công" ?
                                        (
                                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                                {validationMsg.api}
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                        ) :
                                        (
                                            <p className="form-text text-danger">{validationMsg.api}</p>
                                        )
                                }


                                <form onSubmit={handleSubmit(handleUpdate)}>
                                    <div className="form-group w-50">
                                        {/* <label htmlFor="name">Tên loại:</label> */}
                                        <label htmlFor="name">Tên: </label>
                                        <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                        <p className="form-text text-danger">{validationMsg.name}</p>
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="gender" className="mr-2">Chọn giới tính:</label>
                                        <select name="gender" id="gender" value={genderChoose} onChange={(e) => setGenderChoose(e.target.value)}>
                                            {
                                                gender && gender.map((item, index) => (
                                                    <option value={item} key={index}>{item}</option>
                                                ))
                                            }

                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Cập nhật</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCategory;