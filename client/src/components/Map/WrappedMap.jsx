import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

export const WrappedMap = withScriptjs(
  withGoogleMap((props) => {
    const [selectedJob, setSelectedJob] = useState(null);
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 33.97575, lng: -118.39114 }}
      >
        {props.geoCodes.map((location) => (
          <Marker
            key={location.lat}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => {
              setSelectedJob(location);
            }}
            icon={{
              url: "career.svg",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        ))}

        {selectedJob && (
          <InfoWindow
            position={{ lat: selectedJob.lat, lng: selectedJob.lng }}
            options={{
              pixelOffset: new google.maps.Size(0, -30),
              minWidth: 200,
              maxWidth: 300,
            }}
            onCloseClick={() => {
              setSelectedJob(null);
            }}
          >
            <div>
              <h4>{selectedJob.companyName}</h4>
              <p className={selectedJob.category}>
                {selectedJob.category.toUpperCase()}
              </p>
              <a href={selectedJob.link} target="_blank">
                {selectedJob.link}
              </a>

              <p className="salary">${selectedJob.salary}</p>
              <p className="job-description">{selectedJob.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  })
);

export default WrappedMap;
