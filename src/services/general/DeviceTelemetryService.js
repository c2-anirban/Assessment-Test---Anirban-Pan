import baseHasura from "../AxiosClient/axiosBaseHasura";

const DeviceTelemetryService = {
  list: () => {
    return baseHasura.get('/api/rest/device-telemetry');
  },
};

export default DeviceTelemetryService;