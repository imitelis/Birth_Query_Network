// import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";

import Papa from "papaparse";

import { useNotificationDispatchValue } from "../../NotificationContext";

import { getBirthQuery, createQuery } from "../../services/queries";

import MapPlot from "./MapPlot";

const BirthQuery = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [queryUrl, setQueryUrl] = useState("");
  const [queryName, setQueryName] = useState("");
  const [queryComment, setQueryComment] = useState("");
  const [motherRaceCode, setMotherRaceCode] = useState("");
  const [fatherRaceCode, setFatherRaceCode] = useState("");
  const [minBirths, setMinBirths] = useState("");
  const [maxBirths, setMaxBirths] = useState("");
  const [minMotherAge, setMinMotherAge] = useState("");
  const [maxMotherAge, setMaxMotherAge] = useState("");
  const [minBirthWeight, setMinBirthWeight] = useState("");
  const [maxBirthWeight, setMaxBirthWeight] = useState("");
  // const [paymentCode, setpaymentCode] = useState("");
  // const [countyFips, setCountyFips] = useState("");
  // const [limit, setLimit] = useState(null);
  const [queryData, setQueryData] = useState(null);

  const notificationDispatch = useNotificationDispatchValue();

  const newQueryMutation = useMutation(createQuery, {
    onSuccess: () => {
      notificationDispatch({
        type: "GREEN_NOTIFICATION",
        payload: `new query "${queryName}" successfully registered!`,
      });
      handleReset();
    },
    onError: (error) => {
      handleErrorResponse(error, user);
    },
  });

  const handleErrorResponse = (error, user) => {
    if (error?.response?.status === 500) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: "fatal error: lost connection to Birth Query Network",
      });
    } else if (error?.response?.status === 401) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `session expired: please log in ${user.username} and try again`,
      });
    } else if (error?.response?.data.error) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${error?.response?.data.error})`,
      });
    }
  };

  const raceCodes = {
    A: "Asian",
    "2106-3": "White",
    M: "More than one race",
    "2054-5": "Black or African American",
    "1002-5": "American Indian or Alaska Native",
    NHOPI: "Native Hawaiian or Other Pacific",
  };

  useEffect(() => {
    /*
    To remember:
    father_race_code: str = Query(None),
    mother_race_code: str = Query(None),
    min_births: float = Query(None),
    max_births: float = Query(None),
    county_fips: str = Query(None),
    min_mother_age: float = Query(None),
    max_mother_age: float = Query(None),
    min_birth_weight: float = Query(None),
    max_birth_weight: float = Query(None),
    payment_code: int = Query(None),
    limit: int = Query(None), 
  */
    const queryParams = {};

    if (minBirths != "") {
      queryParams.min_births = minBirths;
    }
    if (maxBirths != "") {
      queryParams.max_births = maxBirths;
    }

    if (minMotherAge != "") {
      queryParams.min_mother_age = minMotherAge;
    }
    if (maxMotherAge != "") {
      queryParams.max_mother_age = maxMotherAge;
    }

    if (minBirthWeight != "") {
      queryParams.min_birth_weight = minBirthWeight;
    }
    if (maxBirthWeight != "") {
      queryParams.max_birth_weight = maxBirthWeight;
    }

    if (fatherRaceCode != "") {
      queryParams.father_race_code = fatherRaceCode;
    }
    if (motherRaceCode != "") {
      queryParams.mother_race_code = motherRaceCode;
    }

    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&");

    setQueryUrl(`${queryString ? `?${queryString}` : ""}`);
  }, [
    queryUrl,
    minBirths,
    maxBirths,
    minMotherAge,
    maxMotherAge,
    minBirthWeight,
    maxBirthWeight,
    fatherRaceCode,
    motherRaceCode,
  ]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramMinBirths = searchParams.get("min_births");
    const paramMaxBirths = searchParams.get("max_births");
    const paramMinMotherAge = searchParams.get("min_mother_age");
    const paramMaxMotherAge = searchParams.get("max_mother_age");
    const paramMinBirthWeight = searchParams.get("min_birth_weight");
    const paramMaxBirthWeight = searchParams.get("max_birth_weight");
    const paramFatherRaceCode = searchParams.get("father_race_code");
    const paramMotherRaceCode = searchParams.get("mother_race_code");
    const paramQueryName = searchParams.get("query_name");
    const paramQueryComment = searchParams.get("query_comment");

    if (paramMinBirths !== null) {
      setMinBirths(paramMinBirths);
    }
    if (paramMaxBirths !== null) {
      setMaxBirths(paramMaxBirths);
    }

    if (paramMinMotherAge !== null) {
      setMinMotherAge(paramMinMotherAge);
    }
    if (paramMaxMotherAge !== null) {
      setMaxMotherAge(paramMaxMotherAge);
    }

    if (paramMinBirthWeight !== null) {
      setMinBirthWeight(paramMinBirthWeight);
    }
    if (paramMaxBirthWeight !== null) {
      setMaxBirthWeight(paramMaxBirthWeight);
    }

    if (paramFatherRaceCode !== null) {
      setFatherRaceCode(paramFatherRaceCode);
    }
    if (paramMotherRaceCode !== null) {
      setMotherRaceCode(paramMotherRaceCode);
    }

    if (paramQueryName !== null) {
      setQueryName(paramQueryName);
    }
    if (paramQueryComment !== null) {
      setQueryComment(paramQueryComment);
    }
  }, []);

  const handleReset = () => {
    setQueryUrl("");
    setMinBirths("");
    setMaxBirths("");
    setMinMotherAge("");
    setMaxMotherAge("");
    setMinBirthWeight("");
    setMaxBirthWeight("");
    setFatherRaceCode("");
    setMotherRaceCode("");
    setQueryName("");
    setQueryComment("");
    setQueryData(null);
  };

  const handleRun = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      setLoading(true);

      const data = await getBirthQuery(queryUrl);
      setQueryData(data);
      console.log("url,", queryUrl);
      if (data.data && queryUrl == "") {
        notificationDispatch({
          type: "GREEN_NOTIFICATION",
          payload: `successful query: but try making a non default query`,
        });
      } else if (data.data && queryUrl != "") {
        notificationDispatch({
          type: "GREEN_NOTIFICATION",
          payload: `successful query: now you can save the query and the data`,
        });
      } else if (data.message) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `no data found: there are no matches for your specific query`,
        });
      }
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.status === 401) {
        handleErrorResponse(error, user);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const csvData = Papa.unparse(queryData.data);

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "BirthQuery_Data.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    /*
    To remember:
    name: constr(min_length=8, max_length=80)
    query_url: constr(min_length=8, max_length=200)
    user_comment: constr(min_length=8, max_length=200)
    */
    try {
      if (!queryName || !queryComment) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: query name () and query comment () are required`,
        });
      } else if (queryName.length < 8 || queryComment.length < 8) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: username (${queryName}) and password (${queryComment}) must be at least 8 char long`,
        });
      } else if (queryUrl.length < 8) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: you cannot save the default query`,
        });
      } else {
        const queryObject = {
          name: queryName,
          query_url: queryUrl,
          user_comment: queryComment,
        };
        newQueryMutation.mutate(queryObject);
      }
    } catch (error) {
      // console.log(error);
      handleErrorResponse(error, user);
    }
  };

  if (user && user !== null) {
    return (
      <div className="z-index-0 flex flex-col h-auto min-h-screen max-w-screen mx-auto">
        <div className="login-form col-span-2 flex flex-col justify-center pb-4 mb-0">
          <span className="text-center mt-24">
            <p className="text-6xl font-bold text-black mt-8">
              The <span className="text-teal-400">Birth Query</span>
            </p>
            <br />
            {queryData === null ? (
              <>
                <p className="text-lg text-gray-500 mt-4 mb-4">
                  Go ahead and make a query!
                </p>
              </>
            ) : (
              <></>
            )}
          </span>
          {queryData !== null && !queryData.message ? (
            <div className="text-lg text-gray-500 grid grid-rows-2 grid-cols-1 lg:grid-cols-3 mx-auto my-6 gap-2">
              <div className="row-span-2 text-4xl font-bold mt-6 ml-24 text-teal-400">
                New Query:
              </div>
              <div className="flex mr-20 gap-2">
                <label
                  htmlFor="query-name"
                  className="text-xl text-gray-500 mt-2"
                >
                  Query name:{" "}
                </label>
                <input
                  type="text"
                  name="query-name"
                  id="query-name"
                  required
                  placeholder="Your query name..."
                  value={queryName}
                  onChange={({ target }) => setQueryName(target.value)}
                  className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 py-1 px-2 w-80"
                />
              </div>

              <div className="text-xl ml-20">by: {user.username}</div>

              <div className="flex mr-12 gap-2">
                <label
                  htmlFor="query-comment"
                  className="text-xl text-gray-500 mt-2"
                >
                  Query comment:{" "}
                </label>
                <input
                  type="text"
                  name="query-comment"
                  id="query-comment"
                  required
                  placeholder="Your query comment..."
                  value={queryComment}
                  onChange={({ target }) => setQueryComment(target.value)}
                  className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 py-1 px-2 w-80"
                />
              </div>

              <div className="ml-20">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white text-2xl shadow-md rounded-md"
                >
                  <i className="fas fa-save"></i> Save
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="lg:flex space-x-12">
            <div className="lg:w-70">
              <MapPlot loading={loading} data={queryData} />
            </div>
            <div className="lg:w-50">
              <div className="gap-8 mt-0 lg:mt-8 grid grid-cols-2">
                <div className="mx-0">
                  <label
                    htmlFor="min-births"
                    className="text-xl text-gray-500 mt-2"
                  >
                    Min Births:{" "}
                  </label>
                  <input
                    type="number"
                    name="min-births"
                    id="min-births"
                    placeholder="(total)"
                    pattern="[0-9]*"
                    min="0"
                    max="99999"
                    value={minBirths}
                    onChange={({ target }) => setMinBirths(target.value)}
                    className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-1 w-36"
                  />
                </div>
                <div className="mx-0">
                  <label
                    htmlFor="max-births"
                    className="text-xl text-gray-500 mt-2"
                  >
                    Max Births:{" "}
                  </label>
                  <input
                    type="number"
                    name="max-births"
                    id="max-births"
                    placeholder="(total)"
                    pattern="[0-9]*"
                    min="0"
                    max="9999"
                    value={maxBirths}
                    onChange={({ target }) => setMaxBirths(target.value)}
                    className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-1 w-36"
                  />
                </div>
                <div className="mx-0">
                  <label
                    htmlFor="min-mother-age"
                    className="text-xl text-gray-500 mt-2"
                  >
                    Min mot. Age:{" "}
                  </label>
                  <input
                    type="number"
                    name="min-mother-age"
                    id="min-mother-age"
                    placeholder="(yrs)"
                    pattern="[0-9]*"
                    min="20"
                    max="100"
                    value={minMotherAge}
                    onChange={({ target }) => setMinMotherAge(target.value)}
                    className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-1 w-28"
                  />
                </div>
                <div className="mx-0">
                  <label
                    htmlFor="max-mother-age"
                    className="text-xl text-gray-500 mt-2"
                  >
                    Max mot. Age:{" "}
                  </label>
                  <input
                    type="number"
                    name="max-mother-age"
                    id="max-mother-age"
                    placeholder="(yrs)"
                    pattern="[0-9]*"
                    min="20"
                    max="100"
                    value={maxMotherAge}
                    onChange={({ target }) => setMaxMotherAge(target.value)}
                    className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-1 w-28"
                  />
                </div>
                <div className="mx-0">
                  <label
                    htmlFor="min-birth-weight"
                    className="text-xl text-gray-500 mt-2"
                  >
                    Min bir. Weight:{" "}
                  </label>
                  <input
                    type="number"
                    name="min-birth-weight"
                    id="min-birth-weight"
                    placeholder="(gms)"
                    pattern="[0-9]*"
                    min="0"
                    max="1000"
                    value={minBirthWeight}
                    onChange={({ target }) => setMinBirthWeight(target.value)}
                    className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-1 w-24"
                  />
                </div>
                <div className="mx-0">
                  <label
                    htmlFor="max-birth-weight"
                    className="text-xl text-gray-500 mt-2"
                  >
                    Max bir. Weight:{" "}
                  </label>
                  <input
                    type="number"
                    name="max-birth-weight"
                    id="max-birth-weight"
                    placeholder="(gms)"
                    pattern="[0-9]*"
                    min="0"
                    max="1000"
                    value={maxBirthWeight}
                    onChange={({ target }) => setMaxBirthWeight(target.value)}
                    className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-1 w-24"
                  />
                </div>
                <div className="mx-0">
                  <label
                    htmlFor="father-single-race"
                    className="text-xl text-gray-500 mt-2"
                  >
                    Fathers sing. Race:{" "}
                  </label>
                  <br />
                  <select
                    id="father-single-race"
                    name="father-single-race"
                    value={fatherRaceCode}
                    onChange={({ target }) => setFatherRaceCode(target.value)}
                    className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-1 w-40 2xl:w-60"
                  >
                    <option value="">Select race</option>
                    {Object.entries(raceCodes).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mx-0">
                  <label
                    htmlFor="mother-single-race"
                    className="text-xl text-gray-500 mt-2"
                  >
                    Mothers sing. Race:{" "}
                  </label>
                  <br />
                  <select
                    id="father-single-race"
                    name="father-single-race"
                    value={motherRaceCode}
                    onChange={({ target }) => setMotherRaceCode(target.value)}
                    className="text-xl text-gray-500 bg-slate-50 bg-opacity-60 rounded-md border-2 p-1 w-40 2xl:w-60"
                  >
                    <option value="">Select race</option>
                    {Object.entries(raceCodes).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mx-0">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white text-2xl shadow-md rounded-md"
                  >
                    <i className="fa-solid fa-sync"></i> Reset
                  </button>
                </div>
                <div className="mx-0">
                  <button
                    onClick={handleRun}
                    className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white text-2xl shadow-md rounded-md run-button"
                  >
                    <i className="fa-solid fa-play"></i> Run
                  </button>
                </div>
                <div className="mx-0">
                  {queryData !== null && !queryData.message ? (
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-emerald-400 hover:bg-emerald-500 text-white text-2xl shadow-md rounded-md"
                    >
                      <i className="fa fa-download"></i> Download
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="z-index-0 flex flex-col h-auto min-h-screen max-w-screen mx-auto">
        <div className="login-form col-span-2 flex flex-col justify-center pb-4 mb-0">
          <span className="text-center mt-24">
            <p className="text-6xl font-bold text-black mt-8">
              The <span className="text-teal-400">Birth Query</span>
            </p>
            <p className="text-lg text-gray-500 mt-4 mb-4">
              Please log in first!
            </p>
          </span>
        </div>
      </div>
    );
  }
};

/*
BirthQuery.propTypes = {
  user: PropTypes.object
};
*/

export default BirthQuery;
