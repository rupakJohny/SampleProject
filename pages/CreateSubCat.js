import React, { Fragment, useState, useEffect } from 'react'
//import { authHeader } from '../AuthHeader/AuthHeader';
import classes from './CreateCat.module.css'
import axios from 'axios';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Login from './LoginForm';

const CreateSubCat = () => {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    console.log(isAuth)

    const [listItems, setListItems] = useState([]);
    console.log("DATA")
    //const[accessToken, setAccessToken]=useState();
    const accessToken = localStorage.getItem('token');

    const apiURL = 'http://5.189.137.25/api';

    const authHeader = axios.create({
        baseURL: apiURL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    async function FetchData() {
        const res = await authHeader.get('/category/getallcategory');
        const data = res.data.item1.filter(item => item.parentCategoryId === null);
        console.log(data)
        setListItems(data)
        console.log("DATA", listItems)

    }

    useEffect(() => {
        FetchData()
    }, [])

    const values = {
        name: '',
        isActive: true,
        parentCategoryID: 1,
    }
    const [initialState, setState] = useState(values);
    const handleInputChange = (evt) => {
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setState({
            ...initialState,
            [evt.target.name]: value
        });
    }

    const handleDropdownChange = (e) => {
       
        setState({
            ...initialState,
            parentCategoryID:42753 ,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(initialState)
        const res = authHeader.post('/subcategory', initialState)
            .then(function (res) {
                if (res.status === 200) {
                    alert(res.data.message)
                    setState({
                        name: '',
                        isActive: true,
                        parentCategoryID: '',
                    })
                }
            })

    }


    return (
        <Fragment>
            {isAuth &&
                <div className='container '>
                    <div className={classes.head}>
                        <h2>Create Sub Category</h2>
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
                                        <button className='btn btn-success btn-raised' onClick={handleSubmit}>Create</button>
                                        <button className='btn'><Link href='/HomePage'>Back</Link></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}


export default CreateSubCat
