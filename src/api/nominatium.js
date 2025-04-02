import axios from "axios";

export async function getCoordinatesByAddress(address) {
  try {
    return await axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon_geojson=1&addressdetails=1&accept-language=kr`
      )
      .then(nominatium_data_byaddress);
  } catch (error) {
    console.error(error);
    return {
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      address: {
        postCode: "",
        countryCode: "",
        addressLine1: "",
      },
    };
  }
}

export function nominatium_data_byaddress(res) {
  var result = [];
  res.data.forEach((element) => {
    const data = {
      coordinate: {
        latitude: element.lat,
        longitude: element.lon,
      },
      address: {
        postCode: element.address.postcode,
        countryCode: element.address.country_code.toUpperCase(),
        addressLine1: element.display_name,
      },
    };
    result.push(data);
  });
  return result;
}
