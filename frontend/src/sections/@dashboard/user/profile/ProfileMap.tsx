import { useState, useEffect } from 'react';
import { Card, CardHeader, Stack, Typography } from '@mui/material';
import Map, { Marker } from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import { MAPBOX_API } from '../../../../config';
import { IconStyle } from './common';
import axios from 'axios';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

type Props = {
  whereWeMet: string;
};

export default function ProfileMap({ whereWeMet }: Props) {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const fetchGeocode = async () => {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${whereWeMet}.json?types=address&access_token=${MAPBOX_API}`
    );
    if (data.features.length && data.features[0].center.length === 2) {
      const [long, lat] = data.features[0].center;
      setLat(lat);
      setLong(long);
    }
  };

  useEffect(() => {
    fetchGeocode();
  }, []);

  return (
    <Card>
      <CardHeader title="Where We Met" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center">
          <IconStyle icon={'eva:pin-outline'} />
          <Typography variant="body2">{whereWeMet}</Typography>
        </Stack>
      </Stack>
      <Map
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 14,
        }}
        longitude={long}
        latitude={lat}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_API}
      >
        <Marker longitude={long} latitude={lat} />
      </Map>
    </Card>
  );
}
