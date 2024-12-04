import axios from "axios";
import { getApiBaseUrl } from "src/constants/flavour";
import { Loading } from "quasar";

const headers = {};

export async function springPostAPI(path, data) {
  Loading.show();
  return axios
    .post(
      getApiBaseUrl() + path,
      { ...data },
      {
        headers: headers,
      }
    )
    .then((res) => {
      if (res.data.error) {
        Loading.hide();
        return { error: true };
      }
      Loading.hide();
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      Loading.hide();
      return { error: true };
    });
}

export async function springGetAPI(path) {
  console.log(getApiBaseUrl() + path);
  Loading.show();
  return axios
    .get(getApiBaseUrl() + path)
    .then((res) => {
      if (res.data.error) {
        Loading.hide();
        return { error: true };
      }
      Loading.hide();
      return res.data;
    })
    .catch((err) => {
      Loading.hide();
      console.log(err);
      return { error: true };
    });
}

export async function springPatchAPI(path, data) {
  Loading.show();
  return axios
    .patch(
      getApiBaseUrl() + path,
      { ...data },
      {
        headers: headers,
      }
    )
    .then((res) => {
      if (res.data.error) {
        Loading.hide();
        return { error: true };
      }
      Loading.hide();
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      Loading.hide();
      return { error: true };
    });
}

export async function springDeleteAPI(path, data) {
  Loading.show();
  return axios
    .delete(getApiBaseUrl() + path)
    .then((res) => {
      if (res.data.error) {
        Loading.hide();
        return { error: true };
      }
      Loading.hide();
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      Loading.hide();
      return { error: true };
    });
}
