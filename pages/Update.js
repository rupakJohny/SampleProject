import React, { Fragment, useState, useEffect } from 'react'
//import { authHeader } from '../AuthHeader/AuthHeader';
import axios from 'axios';
import Link from 'next/link';

const Update = () => {

    /*const [listItems, setListItems] = useState([]);
    const accessToken = localStorage.getItem('token');
    const apiURL = 'http://5.189.137.25/api'

    const authHeader = axios.create({
        baseURL: apiURL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    async function FetchData() {
        const res = await authHeader.get('/category/getallcategory');
        const data = res.data.item1;
        setListItems(data)
    }
    useEffect(() => {
        FetchData()
    })

    const CurrentID=parseInt(localStorage.getItem('CurrentID'));
    const values = {
        id :CurrentID,
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
        authHeader.put('/category', initialState);    
    }*/

        return (
            <Fragment>
                <pre>{JSON.stringify(initialState, undefined, 2)}</pre>
                <div>
                    <label>
                        Name:
                        <input type="text" name="name" value={initialState.name} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label>
                        isActive:
                        <input type="checkbox" name="isActive" checked={initialState.isActive} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label>
                        ParentCategory:
                        <select name='pcategory' value={initialState.pcategory} onChange={handleInputChange}>
                            <option selected value=''>---select---</option>
                            <option value={parseInt('42536')}>Copper and Brass Jewellery Collection</option>
                            
                            {
                                listItems.map((item) => {
                                    <option>{item.categoryName}</option>
                                })
                            }
                        </select>
                    </label>
                </div>
                <div>
                    <button onClick={handleSubmit}>Update</button>
                    <Link href='/HomePage'>Back to homepage</Link>
                </div>
            </Fragment>
        )
    }

    export default Update
