import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
const { kakao } = window;

const MapKakao = () => {
    const uri=process.env.REACT_APP_URI
    const loca = useLocation();
    const [localaddr, setLocaladdr] = useState('');
    const [address, setAddress] = useState([]);
    const [addrlist, setAddrlist] = useState(null);
    const hancleClickAddr = (addr) => {
        if(addr=='--선택 해주세요--')
            setLocaladdr("");
        else
            setLocaladdr(addr);
        console.log(localaddr, "localaddr");
    };
   
    useEffect(() => {
        
        const optionsList = address.map((item, index) => (

            <option key={index} value={item.address} className='list-none'>
                {item.name}
            </option>
        ));
        // setLocaladdr(address[0].address)
        setAddrlist(optionsList);
    }, [address]);

    useEffect(() => {
        const handleserver2 = async () => {
            try {
                const response = await fetch(`${uri}/api/map/get`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("addr", data);
                    
                    setAddress(data);
                } else {
                    console.error('코멘트 불러오기 실패');
                }
            } catch (error) {
                console.error('오류 발생', error);
            }
        };
        handleserver2();
        
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };

        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(localaddr, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                });
                // var infowindow = new kakao.maps.InfoWindow({
                //     content: '<div style="width:150px;text-align:center;padding:6px 0;"></div>',
                // });
                // infowindow.open(map, marker);
                map.setCenter(coords);
            }
        });
    }, [localaddr]);

    return (
        <div className=''>
            <TopBar/>
            <div  id='map' style={{ width: '100%', height: '500px' ,marginTop:'75px' }}></div>
            {addrlist && <select className='' onChange={(e) => hancleClickAddr(e.target.value)}>
                <option>--선택 해주세요--</option>
                {addrlist}
            </select>}
            <label>{localaddr}</label>
        </div>
    );
};

export default MapKakao;
