import Header from "../components/Header"
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ViewCategory=()=>{
    const isAuth= useSelector(state=>state.auth.isAuthenticated);
    
    console.log(isAuth)


    /*const [Items, setItemdata] = useState([]);
    const[accessToken, setAccessToken]=useState();
    const apiURL = 'http://5.189.137.25/api'

    useEffect(()=>{
        
        const token=localStorage.getItem('token');
        setAccessToken(token);
        FetchData()
    
    },[])

    const authHeader = axios.create({
        baseURL: apiURL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    async function FetchData() {
        const res = await authHeader.get('/category');
        const loadedData = res.data;
        console.log(loadedData);
        setItemdata(loadedData);
    }

    const toStr = (a) => {
        if (a == true)
            return "true"
        else
            return "false"
    }

    async function onDelete(Id) {
        await authHeader.put('/category/delete/' + Id);
        FetchData();
    }*/


    return(
        <Fragment>
        {isAuth &&
            <div>
                <button><Link href='/CreateNew'>Create</Link></button>
                <div className='container'>
                    <table className='table table-stripped'>
                        <thead>
                            <tr>
                                <th>Serial No.</th>
                                <th>Name</th>
                                <th>isActive</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Items.map((data) => (
                                <tr>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{toStr(data.isActive)}</td>
                                    <td>
                                        <button><Link href='/Update'>Update</Link></button>
                                        <button onClick={() => onDelete(data.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            }
            {!isAuth &&
            <h2>Not Auth</h2>}
        </Fragment>

    )
}

export default ViewCategory