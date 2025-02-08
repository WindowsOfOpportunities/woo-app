interface GeocodingResult {
  lat: number | null;
  lon: number | null;
  error?: string;
}

export async function getCoordinatesFromAddress(address: {
  streetName: string;
  streetNumber: string;
  postcode: string;
  city: string;
  country: string;
}): Promise<GeocodingResult> {
  try {
    const formattedAddress = encodeURIComponent(
      `${address.streetName} ${address.streetNumber}, ${address.postcode} ${address.city} ${address.country}`
    );

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${formattedAddress}&format=json`,
      {
        headers: {
          'User-Agent': 'WOO-Application/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Geocoding failed with status: ${response.status}`);
    }

    const locationData = await response.json();

    if (!locationData || locationData.length === 0) {
      return {
        lat: null,
        lon: null,
        error: 'No location found for this address',
      };
    }

    return {
      lat: parseFloat(locationData[0].lat),
      lon: parseFloat(locationData[0].lon),
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return {
      lat: null,
      lon: null,
      error: 'Failed to geocode address',
    };
  }
}