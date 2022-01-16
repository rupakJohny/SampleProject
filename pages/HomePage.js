import classes from './HomePage.module.css';
import { Fragment, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '../components/Header'
import CreateCat from './CreateNew';


const Homepage = () => {

    const [Items, setItemdata] = useState([]);
    const accessToken = localStorage.getItem('token');
    const apiURL = 'http://5.189.137.25/api'

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
    }

    return (
        <Fragment>
            <Header />
            <div className={classes.home}>
                <h1>Welcome</h1>
                <button onClick={FetchData}>Go!!</button>
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
                                        <button onClick={()=>{
                                            localStorage.setItem('CurrentID', data.id)
                                        }}><Link href='/Update'>Update</Link></button>
                                        <button onClick={() => onDelete(data.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>

    )
}

export default Homepage