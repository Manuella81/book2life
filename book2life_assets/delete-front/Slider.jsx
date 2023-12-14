import ReactSlider from "react-slider";
import React, {useState, useEffect} from 'react'
import {getBooksAroundMe} from '../api/book'
import {useSelector} from 'react-redux' 
import {selectUser} from '../slices/userSlice'

const Slider = () => {
    const user = useSelector(selectUser)
    const [books, setBooks] = useState([])
    const [currentValue, setCurrentValue] = useState(0);
    const [distance, setDistance] = useState(0) 
    const DEFAULT_COORD = {coords: {
        latitude: 48.859268,
        longitude: 2.347060
        }
    };
    const [location, setLocation] = useState(DEFAULT_COORD)

    useEffect(()=>{
        onSearchBooks()
    }, []);

    const onSearchBooks = ()=>{        
        let data = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
            distance: distance
        }
        
        getBooksAroundMe(data, user.infos.token)
        .then((response)=>{
            console.log("axios books", response);
            setBooks(response.pubs)
        })
        .catch(err=>console.log(err))
    }

   

  return (
    <ReactSlider
        className="customSlider"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        markClassName="customSlider-mark"
        marks={20}
        min={0}
        max={100}
        defaultValue={0}
        value={distance}
        onChange={(value) => setCurrentValue(value)}
        renderMark={(props) => {
            if (props.key < currentValue) {
               props.className = "customSlider-mark customSlider-mark-before";
             } else if (props.key === currentValue) {
              props.className = "customSlider-mark customSlider-mark-active";
            }
            return <span {...props} />;
         }}
    />
  );
};

export default Slider;
