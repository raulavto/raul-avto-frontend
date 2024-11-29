'use client';
import CustomSelect from '@/components/UI/CustomSelect/CustomSelect';
import Button from '@/components/UI/Button/Button';
import { useState } from 'react';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/calculator.json';

const InpuDataCalculator = ({setData}) => {
  const language = useStore(state => state.language);
  
  const [formData, setFormData] = useState({
    auctionCost: '',
    transportType: 'auto',
    fuelType: 'petrol',
    engineCapacity: '',
    yearOfManufacture: '2023',
    auction: 'copart',
    auctionLoc: '500', 
    departPort: 'nj', 
    deliveryPort: 'kl'
  });

  const [errors, setErrors] = useState({});

  if (!translations[language]) {
    throw new Error(`Translations for language "${language}" not found.`);
  }

  const {
    inputData,
    calculatePayments,
    auctionCost,
    transportType,
    fuelType,
    engineCapacity,
    yearOfManufacture,
    auction,
    options,
    auctionLoc,
    deliveryPort,
    departPort
  } = translations[language];

  const fields = [
    { key: 'auctionCost', label: auctionCost, type: 'input', placeholder: '2000' },
    { key: 'transportType', label: transportType, type: 'select', options: [
        { label: options.auto, value: 'auto' },
        { label: options.motorcycle, value: 'motorcycle' }
      ]
    },
    { key: 'fuelType', label: fuelType, type: 'select', options: [
      { label: options.fuelOptions.petrol, value: 'petrol' },
      { label: options.fuelOptions.diesel, value: 'diesel' },
      { label: options.fuelOptions.hybrid, value: 'hybrid' },
      { label: options.fuelOptions.electric, value: 'electric' }
    ]
    },
    { key: 'engineCapacity', label: engineCapacity, type: 'input', placeholder: '389' },
    { key: 'yearOfManufacture', label: yearOfManufacture, type: 'select', options: Array.from({ length: 2024 - 2009 + 1 }, (_, i) => {
        const year = 2024 - i;
        return { label: `${year}`, value: `${year}` };
      })
    },
    { key: 'auction', label: auction, type: 'select', options: [
        { label: 'COPART', value: 'copart' },
        { label: 'Manheim', value: 'manheim' },
        { label: 'IAAI', value: 'iaai' }
      ]
    },
    { key: 'auctionLoc', label: auctionLoc, type: 'select', options: [
      {"label": "ABILENE - TX", "value": 425},
      {"label": "ACE - PERRIS 2 - CA", "value": 275},
      {"label": "ACE CARSON - CA", "value": 160},
      {"label": "ACE-PERRIS", "value": 250},
      {"label": "ACRON CANTON - OH", "value": 475},
      {"label": "ADESA BIRMINGHAM - AL", "value": 350},
      {"label": "ALBANY - NY", "value": 275},
      {"label": "ALBUQUERQUE - NM", "value": 700},
      {"label": "ALTOONA - PA", "value": 450},
      {"label": "AMARILLO - TX", "value": 525},
      {"label": "ANAHEIM - CA", "value": 200},
      {"label": "ANCHORAGE - AK", "value": 1850},
      {"label": "APPLETON - WI", "value": 525},
      {"label": "ASHEVILLE - NC", "value": 325},
      {"label": "ASHLAND - KY", "value": 700},
      {"label": "ATLANTA - GA", "value": 300},
      {"label": "ATLANTA EAST - GA", "value": 325},
      {"label": "ATLANTA NORTH - GA", "value": 300},
      {"label": "ATLANTA SOUTH - GA", "value": 300},
      {"label": "AUSTIN - TX", "value": 275},
      {"label": "AVENEL - NJ", "value": 150},
      {"label": "BALTIMORE - MD", "value": 300},
      {"label": "BATON ROUGE - LA", "value": 475},
      {"label": "BILLINGS - MT", "value": 1050},
      {"label": "BIRMINGHAM - AL", "value": 375},
      {"label": "BIRMINGHAM - BLENDED SALES - AL", "value": 300},
      {"label": "BOISE - ID", "value": 475},
      {"label": "BOSTON-SHIRLEY - MA", "value": 375},
      {"label": "BOWLING GREEN - KY", "value": 550},
      {"label": "BRIDGEPORT - PA", "value": 250},
      {"label": "BUCKHANNON - WV", "value": 500},
      {"label": "BUFFALO - NY", "value": 500},
      {"label": "BURLINGTON - VT", "value": 500},
      {"label": "CASPER - WY", "value": 1300},
      {"label": "CENTRAL NEW JERSEY - NJ", "value": 175},
      {"label": "CHARLESTON - SC", "value": 275},
      {"label": "CHARLOTTE - NC", "value": 300},
      {"label": "CHATTANOOGA - TN", "value": 475},
      {"label": "CHICAGO NORTH - IL", "value": 378},
      {"label": "CHICAGO SOUTH - IL", "value": 378},
      {"label": "CHICAGO WEST - IL", "value": 352},
      {"label": "CINCINNATI - OH", "value": 450},
      {"label": "CINCINNATI SOUTH - OH", "value": 450},
      {"label": "CLEARWATER - FL", "value": 275},
      {"label": "CLEVELAND - OH", "value": 425},
      {"label": "COLTON - CA", "value": 375},
      {"label": "COLUMBIA - SC", "value": 225},
      {"label": "COLUMBUS - OH", "value": 425},
      {"label": "CONCORD - NC", "value": 275},
      {"label": "CORPUS CHRISTI - TX", "value": 275},
      {"label": "CULPEPER - VA", "value": 450},
      {"label": "DALLAS - TX", "value": 275},
      {"label": "DALLAS SOUTH - TX", "value": 275},
      {"label": "DANVILLE - VA", "value": 400},
      {"label": "DAVENPORT - IA", "value": 475},
      {"label": "DAYTON - OH", "value": 475},
      {"label": "DENVER - CO", "value": 675},
      {"label": "DENVER CENTRAL - CO", "value": 675},
      {"label": "DENVER SOUTH - CO", "value": 675},
      {"label": "DES MOINES - IA", "value": 625},
      {"label": "DETROIT - MI", "value": 525},
      {"label": "DOTHAN - AL", "value": 375},
      {"label": "DYER - IN", "value": 600},
      {"label": "EARLINGTON – KY", "value": 500},
      {"label": "EL PASO - TX", "value": 450},
      {"label": "EUGENE - OR", "value": 800},
      {"label": "EXETER - RI", "value": 350},
      {"label": "FAIRBURN - GA", "value": 300},
      {"label": "FAYETTEVILLE - AR", "value": 475},
      {"label": "FLINT - MI", "value": 550},
      {"label": "FORT WAYNE - IN", "value": 600},
      {"label": "FREDERICKSBURG - VA", "value": 325},
      {"label": "FREETOWN – MA", "value": 375},
      {"label": "FREMONT - CA", "value": 350},
      {"label": "FRESNO - CA", "value": 375},
      {"label": "FT.PIERCE - FL", "value": 350},
      {"label": "FT.WORTH - TX", "value": 275},
      {"label": "FREETOWN – MA", "value": 375},
      {"label": "GASTONIA - NC", "value": 325},
      {"label": "GLASSBORO EAST - NJ", "value": 200},
      {"label": "GLASSBORO WEST-NJ", "value": 200},
      {"label": "GRAHAM - WA", "value": 350},
      {"label": "GREER - SC", "value": 275},
      {"label": "GRENADA - MS", "value": 450},
      {"label": "HAMMOND - IN", "value": 600},
      {"label": "HAMPTON - VA", "value": 350},
      {"label": "HARRISBURG - PA", "value": 275},
      {"label": "HARTFORD - CT", "value": 225},
      {"label": "HARTFORD SPRINGFIELD-CT", "value": 250},
      {"label": "HAYWARD - CA", "value": 400},
      {"label": "HELENA - MT", "value": 750},
      {"label": "HONOLULU - HI", "value": 2200},
      {"label": "HOUSTON - TX", "value": 200},
      {"label": "HOUSTON EAST-TX", "value": 200},
      {"label": "INDIANAPOLIS - IN", "value": 600},
      {"label": "IONIA - MI", "value": 650},
      {"label": "JACKSON - MS", "value": 425},
      {"label": "JACKSONVILLE EAST - FL", "value": 225},
      {"label": "JACKSONVILLE NORTH -FL", "value": 225},
      {"label": "JACKSONVILLE WEST - FL", "value": 225},
      {"label": "KANSAS CITY - KS", "value": 625},
      {"label": "KANSAS CITY EAST", "value": 625},
      {"label": "KINCHELOE - MI", "value": 975},
      {"label": "KNOXVILLE - TN", "value": 400},
      {"label": "LANSING - MI", "value": 650},
      {"label": "LAS VEGAS - NV", "value": 325},
      {"label": "LEXINGTON EAST - KY", "value": 525},
      {"label": "LEXINGTON WEST - KY", "value": 525},
      {"label": "LINCOLN - NE", "value": 625},
      {"label": "LITTLE ROCK - AR", "value": 475},
      {"label": "LONG BEACH - CA", "value": 150},
      {"label": "LONG ISLAND - NY", "value": 250},
      {"label": "LONGVIEW - TX", "value": 275},
      {"label": "LOS ANGELES - CA", "value": 160},
      {"label": "LOUISVILLE - KY", "value": 525},
      {"label": "LOUISVILLE - KY", "value": 525},
      {"label": "LUFKIN - TX", "value": 275},
      {"label": "LUMBERTON - NC", "value": 300},
      {"label": "LYMAN - ME", "value": 475},
      {"label": "MACON - GA", "value": 250},
      {"label": "MADISON - WI", "value": 675},
      {"label": "MADISON SOUTH - WI", "value": 675},
      {"label": "MARTINEZ - CA", "value": 400},
      {"label": "MCALLEN - TX", "value": 350},
      {"label": "MEBANE - NC", "value": 300},
      {"label": "MEMPHIS - TN", "value": 500},
      {"label": "MENTONE - CA", "value": 300},
      {"label": "MIAMI CENTRAL - FL", "value": 350},
      {"label": "MIAMI NORTH - FL", "value": 350},
      {"label": "MIAMI SOUTH - FL", "value": 350},
      {"label": "MILWAUKEE - WI", "value": 650},
      {"label": "MILWAUKEE NORTH - WI", "value": 650},
      {"label": "MILWAUKEE SOUTH - WI", "value": 650},
      {"label": "MINNEAPOLIS - MN", "value": 950},
      {"label": "MINNEAPOLIS NORTH - MN", "value": 950},
      {"label": "MOBILE - AL", "value": 400},
      {"label": "MOBILE SOUTH - AL", "value": 400},
      {"label": "MOCKSVILLE - NC", "value": 300},
      {"label": "MONTGOMERY - AL", "value": 400},
      {"label": "NASHVILLE - TN", "value": 425},
      {"label": "NEW ORLEANS - LA", "value": 425},
      {"label": "NEWBURGH - NY", "value": 250},
      {"label": "NORTH BOSTON - MA", "value": 375},
      {"label": "NORTH CHARLESTON - SC", "value": 275},
      {"label": "NORTH SEATTLE - WA", "value": 200},
      {"label": "OCALA - FL", "value": 300},
      {"label": "OGDEN- UT", "value": 550},
      {"label": "OKLAHOMA CITY - OK", "value": 425},
      {"label": "ORLANDO - FL", "value": 300},
      {"label": "ORLANDO NORTH - FL", "value": 300},
      {"label": "ORLANDO SOUTH - FL", "value": 300},
      {"label": "PASCO - WA", "value": 350},
      {"label": "PEORIA - IL", "value": 600},
      {"label": "PHILADELPHIA - PA", "value": 230},
      {"label": "PHILADELPHIA EAST", "value": 230},
      {"label": "PHILADELPHIA EAST - SUBLOT", "value": 230},
      {"label": "PHOENIX - AZ", "value": 350},
      {"label": "PITTSBURG SOUTH - PA", "value": 450},
      {"label": "PITTSBURGH EAST - PA", "value": 450},
      {"label": "PITTSBURGH NORTH - PA", "value": 450},
      {"label": "PITTSBURGH WEST - PA", "value": 450},
      {"label": "PORTLAND NORTH - OR", "value": 275},
      {"label": "PORTLAND SOUTH - OR", "value": 300},
      {"label": "PUNTA GORDA - FL", "value": 325},
      {"label": "PUNTA GORDA SOUTH - FL", "value": 325},
      {"label": "RALEIGH - NC", "value": 300},
      {"label": "RALEIGH NORTH - NC", "value": 300},
      {"label": "RANCHO CUCAMONGA - CA", "value": 200},
      {"label": "RAPID CITY - SD", "value": 1200},
      {"label": "REDDING - CA", "value": 800},
      {"label": "RENO - NV", "value": 550},
      {"label": "RICHMOND - VA", "value": 375},
      {"label": "RICHMOND EAST-VA", "value": 375},
      {"label": "ROCHESTER - NY", "value": 450},
      {"label": "SACRAMENTO - CA", "value": 400},
      {"label": "SALT LAKE CITY - UT", "value": 650},
      {"label": "SAN ANTONIO - TX", "value": 300},
      {"label": "SAN ANTONIO SOUTH - TX", "value": 300},
      {"label": "SAN DIEGO - CA", "value": 230},
      {"label": "SAN JOSE - CA", "value": 400},
      {"label": "SAVANNAH - GA", "value": 125},
      {"label": "SCRANTON - PA", "value": 275},
      {"label": "SEAFORD - DE", "value": 325},
      {"label": "SHREVEPORT - LA", "value": 315},
      {"label": "SIKESTON - MO", "value": 600},
      {"label": "SO SACRAMENTO - CA", "value": 400},
      {"label": "SOMERVILLE - NJ", "value": 175},
      {"label": "SOUTH BOSTON - MA", "value": 375},
      {"label": "SOUTHERN ILLINOIS - IL", "value": 575},
      {"label": "SPARTANBURG - SC", "value": 300},
      {"label": "SPOKANE - WA", "value": 375},
      {"label": "SPRINGFIELD - MO", "value": 625},
      {"label": "ST. CLOUD - MN", "value": 700},
      {"label": "ST. LOUIS - MO", "value": 600},
      {"label": "SUN VALLEY - CA", "value": 375},
      {"label": "SYRACUSE - NY", "value": 325},
      {"label": "TALLAHASSEE - FL", "value": 325},
      {"label": "TAMPA SOUTH - FL", "value": 300},
      {"label": "TANNER - AL", "value": 425},
      {"label": "TIFTON - GA", "value": 275},
      {"label": "TORONTO CANADA", "value": 500},
      {"label": "TRENTON - NJ", "value": 200},
      {"label": "TUCSON - AZ", "value": 400},
      {"label": "TULSA - OK", "value": 475},
      {"label": "VALLEJO - CA", "value": 400},
      {"label": "VAN NUYS - CA", "value": 200},
      {"label": "WACO - TX", "value": 325},
      {"label": "WALTON - KY", "value": 525},
      {"label": "WASHINGTON DC - MD", "value": 300},
      {"label": "WEBSTER - NH", "value": 400},
      {"label": "WEST PALM BEACH - FL", "value": 350},
      {"label": "WEST WARREN - MA", "value": 375},
      {"label": "WHEELING - IL", "value": 550},
      {"label": "WICHITA - KS", "value": 550},
      {"label": "WINDHAM - ME", "value": 500},
      {"label": "YORK HAVEN - PA", "value": 275}
      ]
    },

    { key: 'departPort', label: departPort, type: 'select', options: [
        { label: 'NJ', value: 'nj' },
        { label: 'GA', value: 'ga' },
        { label: 'FL', value: 'fl' },
        { label: 'TX', value: 'tx' },
        { label: 'CA', value: 'ca' },

      ]
    },
    { key: 'deliveryPort', label: deliveryPort, type: 'select', options: [
        { label: 'Klaipeda', value: 'kl' },
        { label: 'Batumi', value: 'bt' },
      ]
    }
  ];

  const handleChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  
    setErrors(prevState => ({
      ...prevState,
      [key]: !value, 
    }));
  };
  
  const handleSubmit = () => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      if (!formData[key]) {
        acc[key] = true;
      }
      return acc;
    }, {});
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      setData(formData);
    }

    console.log(formData);
  };

  return (
    <div className="container mx-auto mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42 mobile:p-[20px] tablet:p-[40px] desktop:p-[80px] max-w-[832px] w-full bg-gradient-sub-block self-start">
      <h2 className="text-primary mobile:text-28 tablet:text-40 font-bold mb-[72px] text-center">
        {inputData}
      </h2>
      <ul className="grid grid-cols-1 tablet:grid-cols-2 gap-6 justify-items-center">
        {fields.map((item, index) => (
          <li key={index} className="w-full flex flex-col space-y-6">
            {item.type === 'input' ? (
              <>
                <label className="text-secondary text-16 font-semibold mb-[8px] truncate">
                  {item.label}
                </label>
                <input
                  type="number"
                  placeholder={item.placeholder}
                  value={formData[item.key] || ''}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                  className={`border ${errors[item.key] ? 'border-red-500' : 'border-primary'} rounded-sub-block-12 bg-input w-full h-[60px] py-[18px] px-[20px] text-primary text-18 font-semibold focus:outline-focus outline-none`}
                />
              </>
            ) : (
              <CustomSelect
                currentSelectedOption={item.options[0].label}
                label={item.label}
                options={item.options}
                containerClassName="w-full flex-1"
                labelClassName="text-secondary text-16 mb-[8px] truncate"
                selectClassName="border border-primary rounded-sub-block-12 bg-input w-full h-[60px] py-[18px] px-[20px] text-primary text-18 font-semibold"
                optionClassName="text-primary w-full"
                optionListClassName="max-h-[100px]"
                onSelect={(option) => handleChange(item.key, option.value)}
              />
            )}
          </li>
        ))}
        <li className="self-end w-full">
          <Button
            className="flex items-center justify-center bg-gradient-red font-bold w-full h-[60px] rounded-sub-block-12 text-18 text-primary"
            type="submit"
            onClick={handleSubmit}
          >
            {calculatePayments}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default InpuDataCalculator;
