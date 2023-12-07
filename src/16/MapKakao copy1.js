import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
const { kakao } = window;

const MapKakao = () => {
    
   
    
   
    

    useEffect(() => {
        // 
        
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };

        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch('부산광역시 부산대학로63번길 2', function (result, status) {
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
    }, []);

    return (
        <div className=''>
            
            <div  id='map' style={{ width: '100%', height: '500px' ,marginTop:'75px' }}></div>
            
            
        </div>
    );
};

export default MapKakao;
