import axios from "axios";
import { getApiBaseUrl } from "src/constants/flavour";

const headers = {};

export async function springPostAPI(path, data) {
  return axios
    .post(
      getApiBaseUrl() + path,
      { ...data },
      {
        headers: headers,
      }
    )
    .then((res) => {
      if (res.data.success == false) {
        return { error: true };
      }
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: true };
    });
}

export async function springGetAPI(path) {
  console.log(getApiBaseUrl() + path);

  return axios
    .get(getApiBaseUrl() + path)
    .then((res) => {
      if (res.data.success == false) {
        return { error: true };
      }
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: true };
    });
}

export async function springPatchAPI(path, data) {
  return axios
    .patch(
      getApiBaseUrl() + path,
      { ...data },
      {
        headers: headers,
      }
    )
    .then((res) => {
      if (res.data.success == false) {
        return { error: true };
      }
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: true };
    });
}

export async function springDeleteAPI(path, data) {
  return axios
    .delete(getApiBaseUrl() + path)
    .then((res) => {
      if (res.data.error) {
        return { error: true };
      }
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: true };
    });
}
