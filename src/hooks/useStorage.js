// 기능 구현
// 1. key 값으로 로컬(또는 세션) 스토리지에 데이터 쓰기(JSON 형식의 문자 값)
// 2. key 값으로 로컬(또는 세션) 스토리지에서 데이터 읽기(JavaScript 데이터 타입 변환된 값)
// 3. key 값으로 로컬(또는 세션) 스토리지 데이터 삭제

import { useCallback, useLayoutEffect, useMemo, useState } from "react";

const {
  localStorage: storage,
  JSON: { stringify: serialize, parse: deserialize },
} = globalThis;

const setData = (key, nextData) => {
  storage.setItem(key, serialize(nextData));
};

const getData = (key) => {
  return deserialize(storage.getItem(key));
};

const deleteData = (key) => {
  storage.removeItem(key);
};

function useStorage(key) {
  const [storageData, setStorageData] = useState();

  useLayoutEffect(() => {
    const data = getData(key);
    setStorageData(data);
  }, [key]);

  // useCallback : 함수 값만 기억 vs. useMemo : JS 모든 값(함수 포함)을 기억
  // useMemo 훅: 모든 JS 값 유형 기억
  // const cachedUpdate = useMemo(() => 함수 값, [])

  // useCallback 훅: JS 함수 값만 기억

  const update = useCallback(
    (nextData) => {
      setData(key, nextData);
      setStorageData(nextData);
    },
    [key]
  );

  // const updateMemo = useMemo(
  //   () => (nextData) => {
  //     setData(key, nextData);
  //     setStorageData(nextData);
  //   },
  //   [key]
  // );

  const remove = useCallback(() => {
    // 로컬 스토리지에서 데이터 삭제
    deleteData(key);
    setStorageData();
  }, [key]);

  // const removeMemo = useMemo(
  //   () => () => { deleteData(key); },
  //   [key]
  // );

  return useMemo(
    () => ({
      storageData,
      update,
      remove,
    }),
    [remove, storageData, update]
  );
}

export default useStorage;
