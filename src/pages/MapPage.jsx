import React, { useState } from 'react';
import NavigatePanel from '../components/navigatePanel';
import Footer from '../components/footer';
import Modal from '../components/Modal/Modal';

function MapPage(props) {
    const [modalActive, setModalActive] = useState(false)
    const [chosenTerritory, setChosenTerritory] = useState(1)
    function showInfo(territory){
        setChosenTerritory(territory)
        setModalActive(true)
    }
    return (
        <div>
            <NavigatePanel/>
            <div className='main'>
                <div id='map'>
                    <div className='mapButton' id='territory1' onClick={()=>showInfo(1)}>1</div>
                    <div className='mapButton' id='territory2' onClick={()=>showInfo(2)}>2</div>
                    <div className='mapButton' id='territory3' onClick={()=>showInfo(3)}>3</div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                Territory {chosenTerritory} information
            </Modal>
            <Footer/>
        </div>
    );
}

export default MapPage;