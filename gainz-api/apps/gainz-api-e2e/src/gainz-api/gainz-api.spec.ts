import axios from 'axios';

describe('GET /ping', () => {
  it('should return a pong', async () => {
    const res = await axios.get(`/ping`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ ping: 'pong' });
  });
});
