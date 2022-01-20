import { Fragment, useEffect, useState } from 'react';
import classes from './HomePage.module.css';
import axios from 'axios';
import Link from 'next/link';

const Homepage = () => {

    const [Items, setItemdata] = useState([]);
    //const[accessToken, setAccessToken]=useState('');
    const accessToken=localStorage.getItem('token');
    const apiURL = 'http://5.189.137.25/api'

    
    
        
    
        
    
    

    const authHeader = axios.create({
        baseURL: apiURL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    async function FetchCatData() {
        const res = await authHeader.get('/category');
        const loadedData = res.data;
        console.log(loadedData);
        setItemdata(loadedData);
    }
    async function FetchSubCatData() {
        const res = await authHeader.get('/subcategory');
        const loadedData = res.data.item1;
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
        FetchCatData();
    }

    return (
        <Fragment>
            <div className={classes.home}>
                <h1>Welcome</h1>
                <div>
                <button><Link href='/CreateCat'>Create</Link></button>
                <button><Link href='/CreateSubCat'>Create Sub</Link></button>
                <button onClick={FetchCatData}>GO Cat</button>
                <button onClick={FetchSubCatData}>GO Sub Cat</button>
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
                                        <button onClick={()=>{
                                            localStorage.setItem('CurrentID', data.id)
                                        }}><Link href='/UpdateSubCat'>Update</Link></button>
                                        <button onClick={() => onDelete(data.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default Homepage