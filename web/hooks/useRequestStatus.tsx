import { useState } from "react";

const DEFAULT_STATUS = {
  loading: false,
  loaded: false,
  FAILED: false,
  error: null,
};

interface IRequestStatus {
  loading: boolean;
  loaded: boolean;
  FAILED: boolean;
  error: any;
}

interface IRequestStatusActions {
  init: () => void;
  success: () => void;
  fail: (error: any) => void;
}

export type IUseRequestStatus = IRequestStatus & IRequestStatusActions;

export const useRequestStatus = () => {
  const [status, setStatus] = useState(DEFAULT_STATUS);

  const init = () => {
    setStatus(() => ({ ...DEFAULT_STATUS, loading: true }));
  };

  const success = () => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      loading: false,
      loaded: true,
    }));
  };

  const fail = (error: any) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      loading: false,
      FAILED: true,
      error,
    }));
  };

  return { ...status, init, success, fail };
};
