import axios from 'axios';
import { Address, Location } from '../../types';

export const getLocation = async (address: Address) => {
  console.log('api address', address);
  //const encodedAddress =
  //  encodeURIComponent(
  //    `${address.address || ''} ${address.city || ''} ${address.province || ''} ${address.country || ''} ${address.postalCode || ''}`
  //    .replace(/ /g, '+')
  //  );
  const encodedAddress =
    encodeURIComponent(
      `${Object.values(address).join(" ")}`
      .replace(/ /g, '+')
    );
  try {
    const res = await axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?language=en&address=${encodedAddress}&key=AIzaSyA9391Y42owd9G11vyuo99LeZEW_90yOf4`
    });

    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const getTimezone = async (location: Location) => {
  console.log('api timezone location', location);
  //const encodedAddress =
  //  encodeURIComponent(
  //    `${address.address || ''} ${address.city || ''} ${address.province || ''} ${address.country || ''} ${address.postalCode || ''}`
  //    .replace(/ /g, '+')
  //  );
  try {
    const res = await axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat}%2C${location.lng}&timestamp=${Date.now()/1000}&key=AIzaSyA9391Y42owd9G11vyuo99LeZEW_90yOf4`
    });

    console.log('api res', res);

    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};
