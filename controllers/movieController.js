const axios = require("axios");

class MovieController {
  static async get(req, res, next) {
    try {
      let { data } = await axios({
        url: "https://imdb-top-100-movies.p.rapidapi.com/premiummovies",
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "206048b294msh3f43529c347895ep13c30ajsn0d9f344e0ca0",
          "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async detail(req, res, next) {
    try {
      let { id } = req.params;
      let { data } = axios({
        url: "https://imdb-top-100-movies.p.rapidapi.com/premiummovies/" + id,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "206048b294msh3f43529c347895ep13c30ajsn0d9f344e0ca0",
          "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = MovieController;
