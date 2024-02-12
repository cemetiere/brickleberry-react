import React, { useEffect, useState } from 'react';
import NavigatePanel from '../components/navigatePanel';
import Footer from '../components/footer';
import useAnimalStore from '../store/animalStore';
import axios from 'axios';
import useUserStore from '../store/userStore';

function AnimalPage(props) {
    const rows = 35;
    let {animal, setAnimal} = useAnimalStore();
    let [page, setPage] = useState(1);
    let [pageCount, setPageCount] = useState(4);
    const [regulationNeeded, setRegulationNeeded] = useState(false)
    const {userRole} = useUserStore();
    let [invRequest, setInvRequest] = useState("true")
    let [regRequest, setRegRequest] = useState("true")
    const [message, setMessage] = useState("")
    const [regMessage, setRegMessage] = useState("")
    function getPageCount(){
        axios.get('http://localhost:8010/proxy/api/animal/pageCount', {params:{pageSize: rows}})
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
    function getAnimals(){
        axios.get('http://localhost:8010/proxy/api/animal/all', {params:{pageSize: rows, pageNumber: page}})
        .then(resp => {
            setAnimal(resp.data)
            console.log(resp.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function getRegStatus(){
        axios.get('http://localhost:8010/proxy/api/animal/checkRegulation')
        .then(resp => {
            setRegulationNeeded(resp.data)

        })
        .catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        getRegStatus()
        getPageCount()
        checkInventarizationRequirement()
        checkRegulationRequirement()
        getAnimals();
    },[page, invRequest, regRequest])

    function inventarization(){
        axios.post('http://localhost:8010/proxy/api/function/inventarization')
        .then(resp => {
            console.log(resp.data)
            getRegStatus()
            getAnimals()
            alert("Request sended!")
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function regulation(){
        axios.post('http://localhost:8010/proxy/api/function/regulation',null, {params:{responsiblePersonId: 33}})
        .then(resp => {
            console.log(resp.data)
            getAnimals()
            getRegStatus()
            alert("Request sended!")
        })
        .catch(error=>{
            console.log(error)
        })
    }
    async function updateInventarizationRequirement(){
        axios.post('http://localhost:8010/proxy/api/function/updateInventarizationRequirement',null, {params:{value: invRequest}})
        .then(resp => {
            console.log(resp.data)
            alert("Запрос отправлен!")
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function checkInventarizationRequirement(){
        axios.get('http://localhost:8010/proxy/api/function/checkInventarizationRequirement')
        .then(resp => {
            if(resp.data == true){
                setMessage("Inventarization is necessery!!")
            } else {
                setMessage("")
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }
    async function updateRegulationRequirement(){
        axios.post('http://localhost:8010/proxy/api/function/updateRegulationRequirement',null, {params:{value: regRequest}})
        .then(resp => {
            console.log(resp.data)
            alert("Запрос отправлен!")
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function checkRegulationRequirement(){
        axios.get('http://localhost:8010/proxy/api/function/checkRegulationRequirement')
        .then(resp => {
            if(resp.data == true){
                setRegMessage("Regulation is necessery!!")
            } else {
                setRegMessage("")
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const [typeID, setTypeID] = useState(0)
    const [territoryID, setTerritoryID] = useState(0)
    const [change, setChange] = useState(0)
    function executeInventarization(){
        let p = {
            change: change,
            typeId: typeID,
            terId: territoryID,
            creatorId: 33
        }

        axios.post('http://localhost:8010/proxy/api/function/inventarization', p)
        .then(resp => {
            getAnimals()
        })
        .catch(error=>{
            console.log("Incorrect data!")
        })
    }
    return (
        <div>
            <NavigatePanel/>
            <div className='main'>
                <div className="people_table">
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>type</th>
                            <th>count</th>
                            <th>territories</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            animal.map((v) => (
                                <tr key={v.id} >
                                    <td>{v.id}</td>
                                    <td>{v.typeName}</td>
                                    <td>{v.count}</td>
                                    <td>{v.territoriesId}</td>
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
                {userRole=="Научный отдел"?
                    <div className='ioPanel animal'>
                        <span>Is inventarization necessery?</span>
                        <select onChange={e => setInvRequest(e.target.value)}>
                            <option value={"true"}>Yes</option>
                            <option value={"false"}>No</option>
                        </select>
                        <a href="#" onClick={()=>updateInventarizationRequirement()}><span>Confirm!!</span></a>

                        <span>Is regulation necessery?</span>
                        <select onChange={e => setRegRequest(e.target.value)}>
                            <option value={"true"}>Yes</option>
                            <option value={"false"}>No</option>
                        </select>
                        <a href="#" onClick={()=>updateRegulationRequirement()}><span>Confirm!!</span></a>

                    </div>: userRole=="Инспектор"?
                    <div className='ioPanel animal'>
                        <input type='number' placeholder='type id' onChange={e => setTypeID(e.target.value)}/>
                        <input type='number' placeholder='territory id' onChange={e => setTerritoryID(e.target.value)}/>
                        <input type='number' placeholder='change' onChange={e => setChange(e.target.value)}/>
                        <button onClick={()=>executeInventarization()}>Confirm</button>
                        <span style={{color: "red", fontSize: 2 + "vh"}}>{message}</span>
                        {message!=""?<button onClick={()=>{
                            setInvRequest("false")
                            invRequest = "false"
                            updateInventarizationRequirement().then(()=>checkInventarizationRequirement())
                            
                        }}>Finish inventarization</button>:<></>}
                        <span style={{color: "red", fontSize: 2 + "vh"}}>{regMessage}</span>
                        {regMessage!=""?<button onClick={()=>{
                            setRegRequest("false")
                            regRequest = "false"
                            updateRegulationRequirement().then(()=>checkRegulationRequirement())
                            
                        }}>Finish Regulation</button>:<></>}
                    </div>:
                    <div className='ioPanel animal'>
                        <a href="#" onClick={()=>inventarization()}><span>Invernarization!</span></a>
                        <a href="#" onClick={()=>regulation()}><span>Regulation!</span></a>
                        <span style={{color: "red", fontSize: 2 + "vh"}}>{message}</span>
                        {message!=""?<button onClick={()=>{
                            setInvRequest("false")
                            invRequest = "false"
                            updateInventarizationRequirement().then(()=>checkInventarizationRequirement())
                            
                        }}>Reject inventarization</button>:<></>}
                        <span style={{color: "red", fontSize: 2 + "vh"}}>{regMessage}</span>
                        {regMessage!=""?<button onClick={()=>{
                            setRegRequest("false")
                            regRequest = "false"
                            updateRegulationRequirement().then(()=>checkRegulationRequirement())
                            
                        }}>Reject regulation</button>:<></>}
                    </div>
                }


            </div>
            <Footer/>
        </div>
    );
}

export default AnimalPage;