/*
 * apolloClientOptions
 * 테스트 중 에러 발생시 => [Network error]: TypeError: Network request failed
 * cmd > ipconfig 확인 후 내부 IP 사용 ex) 192.168.99.1
 */
const options = {
  // uri: "http://192.168.99.1:4000",
  uri: "http://localhost:4000",
};

export default options;
