import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, IconButton, Skeleton, Stack, TextField, Typography, Drawer, List, ListItem, ListItemText, Divider, ListItemIcon, ListItemButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import API_KEY from '../../shared/hooks/constante';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { IonMenuButton, IonToast } from '@ionic/react';
import "./Map.scss";
const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ['places']
  });
  const [map, setMap] = useState(null);
  const [directionsResponses, setDirectionsResponses] = useState({});
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [success_toast ,setSuccess] = useState(false);
  const [moyenTransports, setMoyenTransports] = useState<any[]>([]); // État pour stocker les moyens de transport
  const [type_click, setType_click] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();
  const [error, setError] = useState<string>('');

  const voiture_person = true; // Example value, replace with your actual logic

  useEffect(() => {
    // Charger les moyens de transport depuis localStorage au montage du composant
    const moyenTransportsFromLocalStorage = JSON.parse(localStorage.getItem('moyenTransports') || '[]');
    setMoyenTransports(moyenTransportsFromLocalStorage);
    checkPermission();
  }, []);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error('Error getting current position:', error);
          setError('Error getting current position.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by this browser.');
    }
  };

  const checkPermission = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          getLocation();
        } else if (permissionStatus.state === 'prompt') {
          requestLocation();
        } else {
          setError('Geolocation permission denied.');
        }
      }).catch((error) => {
        console.error('Error checking geolocation permission:', error);
        setError('Error checking geolocation permission.');
      });
    } else {
      console.error('Geolocation permissions API not supported.');
      setError('Geolocation permissions API not supported.');
    }
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  if (!isLoaded) {
    return <Skeleton />;
  }

  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }
    console.log( );
    const travelModes = ['DRIVING', 'BICYCLING', 'TRANSIT', 'WALKING'];
    const promises = travelModes.map(async (mode) => {
      const directionsService = new google.maps.DirectionsService();
      let response;
      try {
        response = await directionsService.route({
          origin : originRef.current.value ,
          destination: destinationRef.current.value,
          travelMode: google.maps.TravelMode[mode]
        });
      } catch (error) {
        console.error(`Error fetching ${mode} directions:`, error);
        // If error occurs, fallback to DRIVING
        response = await directionsService.route({
          origin : originRef.current.value ,
          destination: destinationRef.current.value,
          travelMode: google.maps.TravelMode.DRIVING
        });
      }
      return { mode, response };
    });

    const results = await Promise.all(promises);
    const updatedResponses = {};
    results.forEach((result) => {
      updatedResponses[result.mode] = result.response;
    });
    setDirectionsResponses(updatedResponses);
    openDrawer();
  }

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  function cleanRoute() {
    setDirectionsResponses({});
    setOrigin('');
    setMap(null);
    setDestination('');
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value = '';
    setDrawerOpen(false);
    window.location.reload();
  }

  function getByciclesDuree(): string {
    if (!directionsResponses['BICYCLING']) {
      return 'N/A';
    }
    
    const distanceInKm = Number(directionsResponses['BICYCLING'].routes[0].legs[0].distance.value) / 1000;
    const durationInMinutes = Number(directionsResponses['BICYCLING'].routes[0].legs[0].duration.value) / 60;
    const totalTime = distanceInKm * 2 + durationInMinutes;
  
    return totalTime.toFixed(2) + " mins"; // Formatage avec 2 décimales
  }
  
  function getTransitDuree(): string {
    if (!directionsResponses['TRANSIT']) {
      return 'N/A';
    }
  
    const distanceInKm = Number(directionsResponses['TRANSIT'].routes[0].legs[0].distance.value) / 1000;
    const durationInMinutes = Number(directionsResponses['TRANSIT'].routes[0].legs[0].duration.value) / 60;
    const totalTime = distanceInKm ** 2 + 1 + durationInMinutes;
  
    return totalTime.toFixed(2) + " mins"; // Formatage avec 2 décimales
  }

  function getEmprunte_Carbone(distance: number, type: string): number {
    // Placeholder function, replace with actual implementation
    // Here we'll just return a mock value
    if (type === 'voiture') {
      return distance * 0.2; // Example calculation
    }
    return  distance / 5.5;
  }

  function handleListItemClick(value: number , type : string) {
    const currentCarbone = parseFloat(localStorage.getItem('carbone') || '0');
    const newCarbone = currentCarbone + value;
    localStorage.setItem('carbone', newCarbone.toFixed(2));
    setType_click(type);
    setSuccess(true);
    console.log( success_toast );
    setTimeout(() => {
      setSuccess(false);
    }, 3500);

  }
  
  const center = { lng: 47.521, lat: -18.9153 };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'blue.200',
        backgroundPosition: 'bottom',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box position="absolute" left={0} top={0} height="100%" width="100%" />
      <GoogleMap
        options={{
          streetViewControl: false
        }}
        onLoad={(map) => setMap(map)}
        center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }} >
        {Object.keys(directionsResponses).map((mode) => (
          <DirectionsRenderer key={mode} directions={directionsResponses[mode]} />
        ))}
      </GoogleMap>
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          mt: 0,
          bgcolor: 'white',
          boxShadow: 3,
          minWidth: 'container.md',
          zIndex: 'modal',
        }}
      >
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          <Autocomplete>
          <TextField
            variant="outlined"
            label="Départ"
            placeholder="Départ"
            inputRef={originRef}
            sx={{ width: '150px' }}
          />

          </Autocomplete>
          <Autocomplete>
            <TextField variant="outlined" inputRef={destinationRef} label="Destination" placeholder="Destination" sx={{ width: '150px' }} />
          </Autocomplete>
          <Button variant="contained" color="secondary" onClick={calculateRoute} sx={{      background:"#2959a5",
            borderRadius: '25px',
            border:"1px solid #2959a5",
            color:"white",
            '&:hover': {
              backgroundColor: "#ffff",
              color:"#2959a5"
            },
            '&:active': {
                backgroundColor: "#ffff",
                color:"#2959a5"
            },
            '&.Mui-focusVisible': {
                backgroundColor: "#ffff",
                color:"#2959a5"
            }
           }} >
            Calculer trajet
          </Button>
          <IconButton color="secondary" onClick={cleanRoute}>
            <CloseIcon  sx={{ color: "#2959a5" }} />
          </IconButton>
          {/* Bouton pour ouvrir/fermer le Drawer */}
          <IconButton color="primary" onClick={() => setDrawerOpen(!drawerOpen)}>
            {drawerOpen ? <CloseIcon /> : <Typography><DisplaySettingsIcon sx={{ color: "#2959a5" }} fontSize="large" /></Typography>}
          </IconButton>
          <IonMenuButton/>

        </Stack>
        {/* Drawer pour afficher les détails des itinéraires */}
        <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
          <Box p={2} width="350px" role="presentation">
            <Typography variant="h6" sx={{ color:"#2959a5" }} >Empreinte carbone</Typography>
            <List>
              {/* Affichage pour chaque mode de déplacement */}
              {directionsResponses['DRIVING'] && (
                <>
                  <ListItem  className={success_toast && type_click == 'DRIVING' ? 'list-item__map__smoke' : ''}>
                    {voiture_person ? (
                      <ListItemButton onClick={() => handleListItemClick(getEmprunte_Carbone(directionsResponses['DRIVING'].routes[0].legs[0].distance.value / 1000 , 'voiture') , 'DRIVING'  )}>
                        <ListItemIcon><DirectionsCarFilledIcon sx={{color:'#2959a5'}} />  </ListItemIcon>
                        <ListItemText secondary={`${directionsResponses['DRIVING'].routes[0].legs[0].distance.text}`} primary={`${directionsResponses['DRIVING'].routes[0].legs[0].duration.text}`} />
                        <ListItemText  />
                        <ListItemText primary={getEmprunte_Carbone(directionsResponses['DRIVING'].routes[0].legs[0].distance.value / 1000 , 'voiture').toFixed(2)} primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize:"20px",
                    textAlign:"right"
                  }} />
                      </ListItemButton>
                    ) : (
                      <>
                      </>
                    )}
                  </ListItem>
                  <Divider />
                </>
              )}
              {directionsResponses['BICYCLING'] && (
                <>
                  <ListItem  className={success_toast && type_click == 'BICYCLING' ? 'list-item__map' : ''}>
                    <ListItemButton onClick={() => handleListItemClick(0,'BICYCLING')}>
                      <ListItemIcon><DirectionsBikeIcon sx={{color:'#2959a5'}} />  </ListItemIcon>
                      <ListItemText secondary={`${directionsResponses['BICYCLING'].routes[0].legs[0].distance.text}`} primary={` ${getByciclesDuree()}`} />
                      <ListItemText primary={'0'}  primaryTypographyProps={{
                          color: '#7ac297',
                          fontWeight: 600,
                          fontSize:"20px",
                          textAlign:"right"
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )}
              {directionsResponses['TRANSIT'] && (
                <>
                  <ListItem  className={success_toast && type_click == 'TRANSIT' ? 'list-item__map__smoke' : ''}>
                    <ListItemButton onClick={() => handleListItemClick(getEmprunte_Carbone(directionsResponses['TRANSIT'].routes[0].legs[0].distance.value / 1000 , 'transport') , 'TRANSIT' )}>
                      <ListItemIcon><DirectionsBusIcon sx={{color:'#2959a5'}} />  </ListItemIcon>
                      <ListItemText secondary={`${directionsResponses['TRANSIT'].routes[0].legs[0].distance.text}`} primary={` ${(getTransitDuree())}`} />
                      <ListItemText primary={Number(getEmprunte_Carbone(directionsResponses['TRANSIT'].routes[0].legs[0].distance.value / 1000 , 'transport')).toFixed(2)} primaryTypographyProps={{
                          fontWeight: 600,
                          fontSize:"20px",
                          textAlign:"right",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )}
              {directionsResponses['WALKING'] && (
                <>
                  <ListItem  className={success_toast && type_click == 'WALKING'  ? 'list-item__map' : ''} >
                    <ListItemButton onClick={() => handleListItemClick(0 , 'WALKING' )}>
                      <ListItemIcon><DirectionsWalkIcon sx={{color:'#2959a5'}} />  </ListItemIcon>
                      <ListItemText secondary={`${directionsResponses['WALKING'].routes[0].legs[0].distance.text}`} primary={` ${directionsResponses['WALKING'].routes[0].legs[0].duration.text}`}/>
                      <ListItemText primary={'0'}  primaryTypographyProps={{
                          color: '#7ac297',
                          fontWeight: 600,
                          fontSize:"20px",
                          textAlign:"right"
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Map;
