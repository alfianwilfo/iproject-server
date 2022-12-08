const axios = require("axios");

class CoronaVirus {
  static async getCountry(req, res, next) {
    try {
      let { name } = req.query;
      let { data } = await axios({
        url: "https://covid-193.p.rapidapi.com/countries",
        method: "GET",
        params: { search: name },
        headers: {
          "X-RapidAPI-Key":
            "206048b294msh3f43529c347895ep13c30ajsn0d9f344e0ca0",
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getStatistic(req, res, next) {
    try {
      let { name } = req.query;
      let { data } = await axios({
        url: "https://covid-193.p.rapidapi.com/statistics",
        method: "GET",
        params: { country: name },
        headers: {
          "X-RapidAPI-Key":
            "206048b294msh3f43529c347895ep13c30ajsn0d9f344e0ca0",
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getHistory(req, res, next) {
    try {
      let { country, day } = req.query;
      let { data } = await axios({
        url: "https://covid-193.p.rapidapi.com/history",
        method: "GET",
        params: { country: country, day: day },
        headers: {
          "X-RapidAPI-Key":
            "206048b294msh3f43529c347895ep13c30ajsn0d9f344e0ca0",
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CoronaVirus;
