import axios from 'axios';

import { ReadingsRequest, ReadingsResponse, ReadingsError } from '../signal/events';

export const READINGS_URL = 'https://storage.googleapis.com/bulb-interview/meterReadingsReal.json';

class ReadingsService {
  listen() {
    this.namespace().listen(
      ReadingsRequest, () => this.fetchReadings(),
    );
  }

  fetchReadings() {
    const ns = this.namespace;

    axios.get(READINGS_URL)
      .then(response => ns().trigger(ReadingsResponse.with(response.data.electricity)))
      .catch(error => ns().trigger(ReadingsError.with(error)));
  }
}

export default ReadingsService;
