import React, { useEffect, useState } from 'react';
import NavigatePanel from '../components/navigatePanel';
import Footer from '../components/footer';
import Modal from '../components/Modal/Modal';
import useAnimalStore from '../store/animalStore';
import axios from 'axios';

function MapPage(props) {
    const rows = 25;
    let {animal, setAnimal} = useAnimalStore();
    const [modalActive, setModalActive] = useState(false)
    const [chosenTerritory, setChosenTerritory] = useState(1)
    let [page, setPage] = useState(1);
    let [pageCount, setPageCount] = useState(1);
    function showInfo(territory){
        getPageCount()
        setChosenTerritory(territory)
        getAnimals(territory)
        setModalActive(true)
    }
    function getPageCount(){
        axios.get('http://localhost:8010/proxy/api/animal/pageByTerritoryIdCount', {params:{territoryId: chosenTerritory, pageSize: rows}})
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
    function getAnimals(n){
        axios.get('http://localhost:8010/proxy/api/animal/animalsByTerritory', {params:{territoryId: n,pageSize: rows, pageNumber: page}})
        .then(resp => {
            setAnimal(resp.data)
            console.log(resp.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        getAnimals(chosenTerritory);
    },[page])
    return (
        <div>
            <NavigatePanel/>
            <div className='main map'>
                <div id='map'>
                    <div className='mapButton' id='territory1' onClick={()=>showInfo(1)}>1</div>
                    <div className='mapButton' id='territory2' onClick={()=>showInfo(2)}>2</div>
                    <div className='mapButton' id='territory3' onClick={()=>showInfo(3)}>3</div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="people_table">
                        <table>
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>type</th>
                                <th>count</th>
                                <th>territory</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
    
                                    animal.map((v) => (
                                        <tr key={v.id}>
                                            <td>{v.id}</td>
                                            <td>{v.typeName}</td>
                                            <td>{v.count}</td>
                                            <td>{chosenTerritory}</td>
                                        </tr>
                                    ))

                            }
                            </tbody>
                        </table>
                    </div>
                <div className='pagination'>
                    <button onClick={()=>prevPage()}>&laquo;</button>
                    page {page} / {pageCount}
                    <button onClick={()=>nextPage()}>&raquo;</button>
                </div>
            </Modal>
            <Footer/>
        </div>
    );
}

export default MapPage;