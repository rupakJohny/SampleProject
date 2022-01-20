import React, { Fragment, useState, useEffect } from 'react'
import classes from './CreateCat.module.css'
//import { authHeader } from '../AuthHeader/AuthHeader';
import axios from 'axios';
import Link from 'next/link';

const Update = () => {

    const values = {
        id: 1,
        name: '',
        isActive: true,
        
    }
    const [initialState, setState] = useState(values);
    const accessToken = localStorage.getItem('token');
    const apiURL = 'http://5.189.137.25/api'

    const authHeader = axios.create({
        baseURL: apiURL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })


    const CurrentID = parseInt(localStorage.getItem('CurrentID'));
    async function FetchData() {
        const res = await authHeader.get('/category/' + CurrentID);
        const data = res.data;
        setState(data)
    }
    useEffect(() => {
        FetchData();
    }, [])

    const handleDropdownChange = (e) => {
       
        setState({
            ...initialState,
            parentCategoryID: e.target.value,
        })
    }

    const handleInputChange = (evt) => {
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setState({
            ...initialState,
            [evt.target.name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(initialState)
        const res = authHeader.put('/subcategory', initialState);
        if (res) {
            setState({
                name: '',
                isActive: true,
            })

        }
    }

    return (
        <div className='container '>
            <div className={classes.head}>
                <pre>{JSON.stringify(initialState, undefined, 2)}</pre>
                <h2>Update Category</h2>
            </div>
            <div className={classes.base}>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <label className='form-label'>
                                Name:
                            </label>
                        </div>
                        <div className='col-md-9'>
                            <input type="text" name="name" className='form-control' value={initialState.name} onChange={handleInputChange} />

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <label className='form-label'>
                                isActive:
                            </label>
                        </div>
                        <div className='col-md-9'>
                            <input type="checkbox" className='form-check-input' name="isActive" checked={initialState.isActive} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='row'>
                                <div className='col-md-3'>
                                    <label className='form-label'>
                                        ParentCategory:
                                    </label>
                                </div>
                                <div className='col-md-9'>
                                    <select name='categoryName' className='form-control' onChange={handleDropdownChange}>
                                        <option selected value=''></option>
                                        {listItems.map((item) => (
                                            <option value={item.id}  >{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                    <div>
                        <div className='row'>
                            <div className='col-md-3'></div>
                            <div className='col-md-9'>
                                <button className='btn btn-success btn-raised' onClick={handleSubmit}>Update</button>
                                <button className='btn'><Link href='/HomePage'>Back</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update
