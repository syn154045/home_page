// const eBird = () => {
//     const [eBirdData, setEBirdData] = useState(null);
//     const [regionCode, setRegionCode] = useState('');
//     const [ebirdData, setEbirdData] = useState(null);
//     const mapRef = useRef<HTMLDivElement>(null);

//     // useEffect(() => {
//     //     if (mapRef.current) {
//     //         const map = new google.maps.Map(mapRef.current, {
//     //             center: { lat:35.0268, lng: 135.7727 },
//     //             zoom: 15,
//     //         });
//     //     }
//     // }, [mapRef]);

//     return (
//         <Body title="Bird Accounting Prediction">
//             <div className="flex flex-col">
//                 <h2 className="text-xl">
//                     本アプリ概要：
//                 </h2>
//                 <p className="mt-5">
//                     OpenWeatherAPI 及び eBirdAPI の使用、かつ TensorFlow による学習に基づいて、野鳥の出現予測を提供するアプリである
//                 </p>
//             </div>
//             <EBirdRegionSearch />
//             <div className="mt-5">
//                 <div ref={mapRef} style={{ width: '100%', height: '400px'}}></div>

//             </div>

//             {ebirdData && (
//                 <div className="mt-5">
//                     <h2 className="text-xl font-semibold mb-2">eBirdデータ結果：</h2>
//                     <pre className="p-4 rounded overflow-auto">
//                         {JSON.stringify(ebirdData, null, 2)}
//                     </pre>
//                 </div>
//             )}
//         </Body>
//     )
// };

// export default eBird;

'use client';

// import EBirdMap from '@/components/app/elements/maps/_EBirdMap';
import EBirdRegionSearch from '@/components/app/elements/searches/_EBirdRegionSearch';
import { useState } from 'react';

interface Marker {
    lat: number;
    lng: number;
    comName: string;
    sciName: string;
    howMany: number;
}

export default function Home() {
    const [eBirdData, setEBirdData] = useState<any>([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isMapScriptLoaded, setIsMapScriptLoaded] = useState(false);
    const [markers, setMarkers] = useState<Marker[]>([]);

    const handleSearchComplete = (data: any) => {
        setEBirdData(data);
        console.log(eBirdData);

        // console.log(Object.keys(eBirdData)[0].length);
        // if (Object.keys(eBirdData)[0].length === 0) {
        // setIsEmpty(true);
        // }
    };

    // useEffect(() => {
    //     setMarkers(eBirdData.map((item) => ({
    //         lat: item.lat,
    //         lng: item.lng,
    //         comName: item.comName,
    //         sciName: item.sciName,
    //         howMany: item.howMany,
    //     })));
    // }, [eBirdData]);

    // useEffect(() => {
    //     const loadScript = (src: string) => {
    //         return new Promise((resolve, reject) => {
    //             const script = document.createElement('script');
    //             script.src = src;
    //             script.async = true;
    //             script.defer = true;
    //             script.onload = resolve;
    //             script.onerror = reject;
    //             document.head.appendChild(script);
    //         });
    //     };

    //     loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=marker&loading=async`)
    //         .then(() => {
    //             setIsMapScriptLoaded(true);
    //         })
    //         .catch((error) => {
    //             console.error('Error loading Google Maps script:', error);
    //         });
    // }, []);

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">
                eBird地域選択とデータ取得
            </h1>
            <EBirdRegionSearch onSearchComplete={handleSearchComplete} />
            {/* {isMapScriptLoaded && <EBirdMap markers={markers} />} */}
            {Object.keys(eBirdData).length > 0 && (
                <div className="mt-5">
                    <h2 className="mb-2 text-xl font-semibold">
                        eBirdデータ結果：
                    </h2>
                    <pre className="overflow-auto rounded-xl border p-4">
                        {JSON.stringify(eBirdData, null, 2)}
                    </pre>
                </div>
            )}
            {isEmpty && (
                <div className="mt-5">検索結果がありませんでした。</div>
            )}
        </div>
    );
}
