'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Questions from '@/components/Partnership/Questions/Questions';
import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css'; // Import the Lightbox styles
import axios from 'axios';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/lotData.json'; // Assuming a separate translation file for LotData

const LotData = () => {
    const searchParams = useParams();
    let {id} = searchParams
    const [lot, setLot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUrl, setCurrentUrl] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const language = useStore(state => state.language);
    const t = translations[language];

    id = id.replace(/\D/g, '');

    useEffect(() => {
        if (window) setCurrentUrl(window.location.href);
    }, []);

    useEffect(() => {
        console.log(id);
        if (id) {
            console.log('Fetching lot data for ID:', id);
            axios.get(`/api/lot?id=${id}`)
                .then(response => {
                    console.log('Lot data received:', response.data);
                    setLot(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, []);

    if (loading) {
        return <div className='h-screen text-white w-full text-center text-2xl mt-20'>Loading...</div>;
    }

    if (error) {
        return <div className='h-screen text-white w-full text-center text-2xl mt-20'>Error: {error}</div>;
    }

    if (!lot) {
        return <div className='h-screen text-white w-full text-center text-2xl mt-20'>Not found</div>;
    }

    const {
        make,
        model,
        year,
        images,
        city,
        damage,
        engine,
        fuel,
        odometer,
        vinCode,
        saleDate,
    } = lot.data;

    return (
        <div className='mobile:p-2 p-4'>
            <div className="max-w-[1348px] mx-auto">
                <div className="mb-[40px] flex mobile:flex-wrap items-center justify-center lg:justify-normal mobile:gap-[20px] tablet:gap-[32px] mt-10">
                    <h1 className="text-primary mobile:text-30 tablet:text-40 font-bold">
                        {year} {make} {model}
                    </h1>
                </div>
                <div className="flex mobile:items-center mobile:justify-center lg:items-start lg:justify-start mobile:flex-wrap lg:flex-nowrap gap-[32px] w-full">
                    <div className="flex flex-col gap-[18px] self-start mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-gradient-sub-block p-[18px] mobile:max-w-full w-full">
                        <Image
                            className="rounded-sub-block-18 mobile:w-full cursor-pointer"
                            src={images?.[0] || '/default-car-image.png'}
                            alt={`Image of ${make} ${model}`}
                            width={627}
                            height={352}
                            onClick={() => setIsOpen(true)}
                        />
                        <ul className="flex flex-wrap gap-2 lg:gap-[18px]">
                            {images?.map((image, index) => (
                                <li key={index}>
                                    <Image
                                        className="rounded-sub-block-11 w-24 h-24 lg:w-[111px] lg:h-[111px] cursor-pointer"
                                        src={image}
                                        alt={`Thumbnail ${index + 1} of ${make} ${model}`}
                                        width={111}
                                        height={111}
                                        onClick={() => { setIsOpen(true); setPhotoIndex(index); }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-[32px] mobile:max-w-full lg:max-w-[462px] w-full">
                        <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-gradient-sub-block p-5 lg:p-[38px] w-full">
                            <h2 className="text-24 text-primary font-bold mb-[32px]">
                                {t.carInformation}
                            </h2>
                            <ul className="flex flex-col gap-4">
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.make}: <span className="text-[16px] text-primary font-semibold uppercase">{make}</span>
                                </li>
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.model}: <span className="text-[16px] text-primary font-semibold uppercase">{model}</span>
                                </li>
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.year}: <span className="text-[16px] text-primary font-semibold">{year}</span>
                                </li>
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.lotNumber}: <span className="text-[16px] text-primary font-semibold uppercase">{id}</span>
                                </li>
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.vinCode}: <span className="text-[16px] text-primary font-semibold">{vinCode}</span>
                                </li>
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.auctionName}: <span className="text-[16px] text-primary font-semibold">{city}</span>
                                </li>
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.purchaseDate}: <span className="text-[16px] text-primary font-semibold">{new Date(saleDate).toLocaleDateString()}</span>
                                </li>
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.engine}: <span className="text-[16px] text-primary font-semibold">{engine}</span>
                                </li>
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.fuel}: <span className="text-[16px] text-primary font-semibold">{fuel}</span>
                                </li>
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.odometer}: <span className="text-[16px] text-primary font-semibold">{odometer} mi</span>
                                </li>
                                <li className="text-[16px] text-secondary font-semibold">
                                    {t.damage}: <span className="text-[16px] text-primary font-semibold">{damage}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <Lightbox
                        open={isOpen}
                        index={photoIndex}
                        close={() => setIsOpen(false)}
                        slides={images.map(image => ({ src: image }))}
                    />
                )}
                <div className='max-w-[1348px] mx-auto'>
                    <Questions link={currentUrl} />
                </div>
                <div className='mt-16'>
                </div>
            </div>
        </div>
    );
};

export default LotData;
