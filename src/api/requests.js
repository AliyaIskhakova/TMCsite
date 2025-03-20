import {$host} from './index.js';

export const AddRequest = async (request) => {  
      const response = await $host.post('/api/Requests/postRequests', request);
      return response.data;
  }



