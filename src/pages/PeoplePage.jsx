import React, { useEffect, useState } from 'react';
import NavigatePanel from '../components/navigatePanel';
import usePeopleStore from '../store/peopleStore'
import axios from 'axios';
import Footer from '../components/footer';
import Modal from '../components/Modal/Modal';

function PeoplePage(props) {
    const rows = 32;
    const [modalActive, setModalActive] = useState(false)
    let {people, setPeople} = usePeopleStore();
    let [name, setName] = useState('');
    let [surname, setSurname] = useState('');
    let [role, setRole] = useState('');
    let [page, setPage] = useState(1);
    let [pageCount, setPageCount] = useState(1);
    useEffect(()=>{
        getPeople();
        getPageCount(rows);
    },[page])

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

    function getPeople(){
        axios.get('http://localhost:8010/proxy/api/person/page', {params:{pageSize: rows, pageNumber: page}})
            .then(resp => {
                setPeople(resp.data)
            })
            .catch(error=>{
                console.log(error)
            })
    }

    function deletePerson(id){
        axios.delete('http://localhost:8010/proxy/api/person/delete', {params:{id: id}})
        .then(resp => {
            getPeople()
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function getPageCount(pageSize){
        axios.get('http://localhost:8010/proxy/api/person/pageCount', {params:{pageSize: pageSize}})
        .then(resp => {
            setPageCount(resp.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    function addPerson(){
        let p = {
            name: name,
            surname: surname,
            role: role
        }

        axios.post('http://localhost:8010/proxy/api/person/add', p)
        .then(resp => {
            getPeople()
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function showReports(pid){
        setModalActive(true)
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
                            <th>name</th>
                            <th>surname</th>
                            <th>role</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            people.map((v) => (
                                <tr key={v.id} onClick={()=>showReports(v.id)}>
                                    <td>{v.id}</td>
                                    <td>{v.name}</td>
                                    <td>{v.surname}</td>
                                    <td>{v.roles}</td>
                                    <td className='deletePerson'><button onClick={()=>deletePerson(v.id)}>delete</button></td>
                                    
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
                <div id='person-form'>
                    <span className='navText' style={{paddingTop: 50 + "%"}}>Add a new person</span>
                    <input type='text' placeholder='name' onChange={e => setName(e.target.value)}/>
                    <input type='text' placeholder='surname' onChange={e => setSurname(e.target.value)}/>
                    <select onChange={e => setRole(e.target.value)}>
                        <option value={'Управляющий'}>Управляющий</option>
                        <option value={'Инспектор'}>Инспектор</option>
                        <option value={'Научный отдел'}>Научный отдел</option>
                        <option value={'Хозотдел'}>Хозотдел</option>
                    </select>
                    <button onClick={addPerson}>add</button>
                </div>
            </div>
            <Footer/>
            <Modal active={modalActive} setActive={setModalActive}>
                
            </Modal>       
        </div>
    );
}

export default PeoplePage;