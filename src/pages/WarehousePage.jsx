import React, { useEffect, useState } from 'react';
import NavigatePanel from '../components/navigatePanel';
import Footer from '../components/footer';
import useResourceStore from '../store/resourceStore';
import axios from 'axios';
import Modal from '../components/Modal/Modal';

function WarehousePage(props) {
    const rows = 30;
    const [chosen, setChosen] = useState(false);
    const [warehouse, setWarehouse] = useState(1);
    let {resource, setResource} = useResourceStore();
    let [page, setPage] = useState(1);
    let [pageCount, setPageCount] = useState(50);
    let [resourceName, setResourceName] = useState("");
    let [resourceCount, setResourceCount] = useState(0);
    let [resourceChange, setResourceChange] = useState(0)
    const [modalActive, setModalActive] = useState(false)

    function getPageCount(){
        axios.get('http://localhost:8010/proxy/api/resource/pageByWarehouseIdCount', {params:{warehouseId: warehouse, pageSize: rows}})
        .then(resp => {
            setPageCount(resp.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function prevPage(){
        if(page==1){
            return
        } else {
            setPage(page-1)
        }
    }
    function nextPage(){
        if(page==pageCount){
            return
        } else {
            setPage(page+1)
        }
    }
    function getResource(){
        axios.get('http://localhost:8010/proxy/api/resource/getByWarehouseId', {params:{warehouseId: warehouse,pageSize: rows, pageNumber: page}})
        .then(resp => {
            setResource(resp.data)
            console.log(resp.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{

        getPageCount()
        getResource();
    },[page, warehouse])

    function showWarehouse(n){
        setWarehouse(n)
        getResource()
        setChosen(true)
    }
    function addResource(){
        let r = {
            name: resourceName,
            count: resourceCount,
            warehouse_id: warehouse
        }

        axios.post('http://localhost:8010/proxy/api/resource/add', r)
        .then(resp => {
            getResource()
            console.log(resp)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    let [chosenResource, setChosenResource] = useState(1);
    function showModal(rid){
        setChosenResource(rid)
        setModalActive(true)
    }
    return (
        <div>
            <NavigatePanel/>
            {chosen==false?            
                <div className='main'>
                    <div className='warehouse' onClick={()=>showWarehouse(1)}>Warehouse 1</div>
                    <div className='warehouse' onClick={()=>showWarehouse(2)}>Warehouse 2</div>
                    <div className='warehouse' onClick={()=>showWarehouse(3)}>Warehouse 3</div>
                </div>:
                <div className='main'>
                    <button id='back' onClick={()=>setChosen(false)}>back</button>
                        <div className="people_table">
                        <table>
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>count</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                resource.map((v) => (
                                    <tr key={v.id} >
                                        <td onClick={()=>showModal(v.id)}>{v.id}</td>
                                        <td onClick={()=>showModal(v.id)}>{v.name}</td>
                                        <td onClick={()=>showModal(v.id)}>{v.count}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <div className='pagination'>
                            <button onClick={()=>prevPage()}>&laquo;</button>
                            page {page} / {pageCount}
                            <button onClick={()=>nextPage()}>&raquo;</button>
                        </div>
                    </div>
                    <div className='ioPanel'>
                        <span className='navText' >Manage resource</span>
                        <input type='text' placeholder='resource name' onChange={e => setResourceName(e.target.value)}/>
                        <input type='number' placeholder='count' onChange={e => setResourceCount(e.target.value)}/>
                        <button onClick={addResource}>add</button>
                    </div>

                    <Modal active={modalActive} setActive={setModalActive}>
                        <span className='navText' >Input resource change</span>
                        <input type='number' placeholder='change' onChange={e => setResourceChange(e.target.value)}/>
                        <button onClick={()=>updateResourceCount()}>Update</button>
                    </Modal>  
                </div>}

            <Footer/>
        </div>
    );
    
    function updateResourceCount(){
        axios.post('http://localhost:8010/proxy/api/resource/update', null, {params:{resourceId: chosenResource, warehouseId: warehouse, change: resourceChange}})
        .then(resp => {
            getResource()

        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export default WarehousePage;