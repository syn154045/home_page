'use client';

import { useEffect, useState } from 'react';

interface Region {
    code: string;
    name: string;
}

interface EBirdRegionSearchProps {
    onSearchComplete: (data: any) => void;
}

const EBirdRegionSearch = ({ onSearchComplete }: EBirdRegionSearchProps) => {
    const [countries, setCountries] = useState<Region[]>([]);
    const [subnational1, setSubnational1] = useState<Region[]>([]);
    const [subnational2, setSubnational2] = useState<Region[]>([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedSubnational1, setSelectedSubnational1] = useState('');
    const [selectedSubnational2, setSelectedSubnational2] = useState('');

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

    const fetchRegions = async (type: string, parentCode = '') => {
        try {
            const response = await fetch(
                `/api/eBird/refs?type=${type}&parentCode=${parentCode}`,
            );
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

    const handleFetchEBirdData = async () => {
        const regionCode =
            selectedSubnational2 || selectedSubnational1 || selectedCountry;
        if (!regionCode) {
            alert('地域を選択してください');
            return;
        }

        try {
            const response = await fetch(
                `/api/eBird/getObs?regionCode=${regionCode}`,
            );
            const data = await response.json();
            onSearchComplete(data);
        } catch (error) {
            console.error('Error fetching eBird data:', error);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex w-2/3 flex-col">
                <select
                    value={selectedCountry}
                    onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        setSelectedSubnational1('');
                        setSelectedSubnational2('');
                    }}
                    className="rounded-lg border bg-app-base p-2 focus:outline-none"
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
                        className="mt-2 rounded-lg border bg-app-base p-2 focus:outline-none"
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
                        onChange={(e) =>
                            setSelectedSubnational2(e.target.value)
                        }
                        className="mt-2 rounded-lg border bg-app-base p-2 focus:outline-none"
                    >
                        <option value="">郡/市を選択</option>
                        {subnational2.map((region) => (
                            <option key={region.code} value={region.code}>
                                {region.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="h-12">
                <button
                    onClick={handleFetchEBirdData}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                    eBirdデータを取得
                </button>
            </div>
        </div>
    );
};

export default EBirdRegionSearch;
