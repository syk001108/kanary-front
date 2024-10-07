// Backend에서 데이터 가져오기(fetch)
export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const confirm = (loading, error) => {
  // 로딩 상태 확인
  if (loading) {
    return <p>Loading...</p>;
  }
  // 에러 상태 확인
  if (error) {
    return <p>Error loading data</p>;
  }
};

/***** Overview.js *****/
// 노드 상태 JSON에서 뽑기
export const countNodeStatus = (nodes = []) => {
  let noConnection = 0;
  let notReady = 0;
  let ready = 0;

  nodes.forEach((node) => {
    if (node.status === "Ready") {
      ready++;
    } else if (node.status === "NotReady") {
      notReady++;
    } else {
      noConnection++;
    }
  });

  return [
    `No Connection: ${noConnection}`,
    `Not Ready: ${notReady}`,
    `Ready: ${ready}`,
  ];
};

// 파드 상태 JSON에서 뽑기
export const countPodStatus = (pods = []) => {
  let Error = 0;
  let Pending = 0;
  let Running = 0;

  pods.forEach((pod) => {
    if (pod.status === "Running") {
      Running++;
    } else if (pod.status === "Pending") {
      Pending++;
    } else {
      Error++;
    }
  });

  return [`Error: ${Error}`, `Pending: ${Pending}`, `Running: ${Running}`];
};
