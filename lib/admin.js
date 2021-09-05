import axios from "axios";

export const createNewCategory =
  (setCat) =>
  ({ name, slug, description }) => {
    console.log(name);

    axios
      .post("/api/category/create", {
        name,
        slug,
        description,
      })
      .then((res) => {
        const { error } = res.data;

        if (!error)
          throw {
            error: {
              code: 400,
            },
          };

        fetchCategory(setCat);
      });
  };

export const fetchCategory = (setCat) => {
  axios.get("/api/category").then((res) => {
    const { error } = res.data;

    if (error)
      throw {
        error: {
          code: 400,
        },
      };

    setCat(res.data);
  });
};
