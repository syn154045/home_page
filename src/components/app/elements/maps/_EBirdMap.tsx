// import { useEffect, useRef } from 'react';

// interface EBirdMapProps {
//     markers: {
//         lat: number;
//         lng: number;
//         comName: string;
//         sciName: string;
//         howMany: number;
//     }[];
// };

// const EBirdMap = ({ markers }: EBirdMapProps) => {
//     const mapRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const loadMap = async () => {
//             if (mapRef.current) {
//                 const { Map } = await google.maps;
//                 const { AdvancedMarkerElement } = await google.maps.marker;

//                 const map = new Map(mapRef.current, {
//                     center: { lat: 35.0268, lng: 135.7727 },
//                     zoom: 15,
//                     mapId: ''
//                 });

//                 markers.forEach((marker) => {
//                     const mapMarker = new AdvancedMarkerElement({
//                         map,
//                         position: { lat: marker.lat, lng: marker.lng },
//                         title: marker.comName,
//                     });

//                     const infoWindow = new google.maps.InfoWindow({
//                         content: `<div><strong>${marker.comName}</strong><br>${marker.sciName}<br>数: ${marker.howMany}</div>`,
//                     });

//                     mapMarker.addListener('click', () => {
//                         infoWindow.open(map, mapMarker);
//                     });
//                 });
//             }
//         };
//         loadMap();
//     }, [markers]);

//     return <div ref={mapRef} style={{ width: '100%', height: '400px', marginBottom: '20px' }}></div>;
// }

// export default EBirdMap;

// // 初期化用の定数
// // const INITIALIZE_LAT = 35.68238;  // 緯度
// // const INITIALIZE_LNG = 139.76556; // 経度
// // const INITIALIZE_ZOOM = 15;        // ズームレベル

// // const INITIALIZE_MAP_WIDTH = '100%';  // 地図の幅
// // const INITIALIZE_MAP_HEIGHT = '400px'; // 地図の高さ

// // const GoogleMap: React.FC = () => {
// //     const mapRef = useRef<HTMLDivElement>(null);
// //     const [map, setMap] = useState<google.maps.Map | null>(null);

// //     useEffect(() => {
// //         if (!mapRef.current) return;

// //         const initializedMap = new google.maps.Map(mapRef.current, {
// //             center: { lat: INITIALIZE_LAT, lng: INITIALIZE_LNG },
// //             zoom: INITIALIZE_ZOOM,
// //         });

// //         setMap(initializedMap);
// //     }, []);

// //     return (
// //         <div>
// //             <div ref={mapRef} style={{ width: INITIALIZE_MAP_WIDTH, height: INITIALIZE_MAP_HEIGHT }} />
// //         </div>
// //     )
// // }

// // export default GoogleMap;
