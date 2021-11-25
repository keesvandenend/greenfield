import axios from 'axios';
import { Address } from '../../types';

export const getLocation = async (address: Address) => {
  const encodedAddress =
    encodeURIComponent(
      `${address.address || ''} ${address.city || ''} ${address.province || ''} ${address.country || ''} ${address.postalCode || ''}`
      .replace(/ /g, '+')
    );
  try {
    const res = await axios({
      method: 'GET',
      url: `https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=${encodedAddress}&key=AIzaSyBNW9ny7Q9TS1iRLYWgrWo4CwAb3wmrEik`
    });

    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};
