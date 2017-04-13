import testData from '../../../mock/sellerorder'

var response = {
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {}
}
export default function (obj) {
  return new Promise(function (resolve, reject) {
    setTimeout(
      function () {
        response.data = testData[obj.apiName]
        response.config = obj
        resolve(response)
      },
      2000
    )
  })
}
