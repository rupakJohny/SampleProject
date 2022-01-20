import React, { Fragment, useState, useEffect } from 'react'
//import { authHeader } from '../AuthHeader/AuthHeader';
import classes from './CreateCat.module.css'
import axios from 'axios';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Login from './LoginForm';

const CreateCat = () => {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    console.log(isAuth)

    const [listItems, setListItems] = useState();
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
        const data = res.data.item1;
        console.log(data)

    }
    useEffect(() => {
        FetchData()
    },[])

    const values = {
        name: '',
        isActive: true,
        pcategory: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(initialState)
        const result = authHeader.post('/category', initialState)
            .then(function (res) {
                if (res.status === 200) {
                    alert(res.data.message)
                    setState({
                        name: '',
                        isActive: true,
                        pcategory: '',
                    })
                }
            })

    }

    return (
        <Fragment>
            {isAuth &&
                <div className='container '>
                    <div className={classes.head}>
                        <h2>Create Category</h2>
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


export default CreateCat
