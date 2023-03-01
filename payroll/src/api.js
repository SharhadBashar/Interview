import request from "superagent";
import Cookies from "js-cookie";

export const ReportAPI = {
  uploadCSV: (file) => {
    return request
      .post('http://localhost:8000/api/report/upload/')
      .send(file)
      .set("X-CSRFToken", Cookies.get("csrftoken"))
  },
  get: () => {
    return request
      .get('http://localhost:8000/api/report/')
      .then(res => {
        return res.body
      })
  }
};
