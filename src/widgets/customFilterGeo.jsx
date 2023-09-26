import { BaseFilter } from '@sitecore-search/react';

export class CustomFilterGeo extends BaseFilter {
    distance;
    name;
    lat;
    lon;
    constructor(name, distance, lat, lon) {
        super();
        this.name = name;
        this.distance = distance;
        this.lat = lat;
        this.lon = lon;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getDistance() {
        return this.distance;
    }
    setDistance(distance) {
        this.distance = distance;
    }
    getLat() {
        return this.lat;
    }
    setLat(lat) {
        this.lat = lat;
    }
    getLon() {
        return this.lon;
    }
    setLon(lon) {
        this.lon = lon;
    }
    toJson() {
        return {
            name: this.name,
            distance: this.distance,
            ...(this.lat ? { lat: this.lat } : undefined),
            ...(this.lon ? { lon: this.lon } : undefined),
            type: 'geoDistance',
        };
    }
} 