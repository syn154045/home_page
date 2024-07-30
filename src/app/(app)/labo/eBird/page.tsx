'use client';

import { Body } from "@/components/app/layouts";
import { useEffect, useState } from "react";

const eBird = () => {
    const [countries, setCountries] = useState([]);
    const [subnational1, setSubnational1] = useState([]);
    const [subnational2, setSubnational2] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedSubnational1, setSelectedSubnational1] = useState('');
    const [selectedSubnational2, setSelectedSubnational2] = useState('');
    const [eBirdData, setEBirdData] = useState(null);
    const [regionCode, setRegionCode] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchRegions('country');
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            fetchRegions('subnational1', selectedCountry);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedSubnational1) {
            fetchRegions('subnational2', selectedSubnational1);
        }
    }, [selectedSubnational1]);

    const fetchRegions = async (type: any, parentCode = '') => {
        try {
            const response = await fetch(`/api/eBird/refs?type=${type}&parentCode=${parentCode}`);
            const data = await response.json();
            switch (type) {
                case 'country':
                    setCountries(data);
                    break;
                case 'subnational1':
                    setSubnational1(data);
                    break;
                case 'subnational2':
                    setSubnational2(data);
                    break;
            }
        } catch (error) {
            console.error(`Error fetching ${type} data:`, error);
        }
    };

    const handleFetchData = async () => {
        const regionCode = selectedSubnational2 || selectedSubnational1 || selectedCountry;
        if (!regionCode) {
            alert('地域を選択してください');
            return;
        }
        try {
            const response = await fetch(`/api/eBird/getObs?regionCode=${regionCode}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Body title="Bird Accounting Prediction">
            <div className="flex flex-col">
                <h2 className="text-xl">
                    当ラボ概要：
                </h2>
                <p className="mt-5">
                    OpenWeatherAPI 及び eBirdAPI の使用、かつ TensorFlow による学習に基づいて、野鳥の出現予測を提供するアプリである
                </p>
            </div>
            <div className="mt-5">
                <select
                    value={selectedCountry}
                    onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        setSelectedSubnational1('');
                        setSelectedSubnational2('');
                    }}
                    className="border p-2 mr-2"
                >
                    <option value="">国を選択</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>

                {selectedCountry && (
                    <select
                        value={selectedSubnational1}
                        onChange={(e) => {
                            setSelectedSubnational1(e.target.value);
                            setSelectedSubnational2('');
                        }}
                        className="border p-2 mr-2"
                    >
                        <option value="">州/県を選択</option>
                        {subnational1.map((region) => (
                            <option key={region.code} value={region.code}>
                                {region.name}
                            </option>
                        ))}
                    </select>
                )}

                {selectedSubnational1 && (
                    <select
                        value={selectedSubnational2}
                        onChange={(e) => setSelectedSubnational2(e.target.value)}
                        className="border p-2 mr-2"
                    >
                        <option value="">郡/市を選択</option>
                        {subnational2.map((region) => (
                            <option key={region.code} value={region.code}>
                                {region.name}
                            </option>
                        ))}
                    </select>
                )}

                <button
                    onClick={handleFetchData}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    eBirdデータを取得
                </button>
            </div>

            {ebirdData && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">eBirdデータ結果：</h2>
                    <pre className="p-4 rounded overflow-auto">
                        {JSON.stringify(ebirdData, null, 2)}
                    </pre>
                </div>
            )}
        </Body>
    )
};

export default eBird;