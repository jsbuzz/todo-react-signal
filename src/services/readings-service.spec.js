import axios from 'axios';
import { TestNameSpace, StartService } from '../../react-signal/test-connect';

import TEST_DATA from '../data/meterReadingsSample.json';
import { ReadingsRequest, ReadingsResponse, ReadingsError } from '../signal/events';
import TestPromise from '../util/test-promise';
import ReadingsService, { READINGS_URL } from './readings-service';

const ReadingsMockSpace = new TestNameSpace();
jest.mock('axios');

describe('ReadingsService', () => {
  beforeEach(() => {
    ReadingsMockSpace.reset();
    StartService(ReadingsService, ReadingsMockSpace);
  });

  it('listens for ReadingsRequest', () => {
    ReadingsMockSpace.hasListenerFor(ReadingsRequest);
  });

  describe('given ReadingsRequest is triggered', () => {
    let axiosPromise;
    beforeEach(() => {
      axiosPromise = new TestPromise();
      axios.get.mockReturnValue(axiosPromise);
      ReadingsMockSpace.triggerSync(ReadingsRequest);
    });

    it('makes a call to READINGS_URL', () => {
      expect(axios.get).toHaveBeenCalledWith(READINGS_URL);
    });

    describe('when http request is successful', () => {
      beforeEach(() => {
        axiosPromise.resolve({ data: TEST_DATA });
      });

      it('triggers ReadingsResponse with correct params', () => {
        expect(ReadingsMockSpace.lastEvent).toBeInstanceOf(ReadingsResponse);
        expect(ReadingsMockSpace.lastEvent.readings).toEqual(TEST_DATA.electricity);
      });
    });
    describe('when http request fails', () => {
      const error = 'error';

      beforeEach(() => {
        axiosPromise.reject(error);
      });

      it('triggers ReadingsError with correct params', () => {
        expect(ReadingsMockSpace.lastEvent).toBeInstanceOf(ReadingsError);
        expect(ReadingsMockSpace.lastEvent.error).toEqual(error);
      });
    });
  });
});
