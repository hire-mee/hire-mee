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
        defaultZoom={11}
        defaultCenter={{ lat: 33.97575, lng: -118.39114 }}
      >
        <Marker
          key={location.lat}
          position={{
            lat: props.homeCoords.lat,
            lng: props.homeCoords.lng,
          }}
          onClick={() => {
            setSelectedJob(false);
          }}
          icon={{
            url: "house.svg",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
        {props.geoCodes.map((location) => {
          if (location.category === "applied") {
            return (
              <Marker
                key={location.lat}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => {
                  setSelectedJob(location);
                }}
                icon={{
                  url: "applied.svg",
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            );
          } else if (location.category === "rejected") {
            return (
              <Marker
                key={location.lat}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => {
                  setSelectedJob(location);
                }}
                icon={{
                  url: "rejected.svg",
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            );
          } else if (location.category === "interview") {
            return (
              <Marker
                key={location.lat}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => {
                  setSelectedJob(location);
                }}
                icon={{
                  url: "interview.svg",
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            );
          } else if (location.category === "offers") {
            return (
              <Marker
                key={location.lat}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => {
                  setSelectedJob(location);
                }}
                icon={{
                  url: "offers.svg",
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            );
          }
        })}

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
