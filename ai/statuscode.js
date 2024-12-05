const statusCodes = {
  400: 'BadRequestError（不正なリクエスト）',
  401: 'AuthenticationError（認証エラー）',
  403: 'PermissionDeniedError（権限拒否）',
  404: 'NotFoundError（未発見エラー）',
  422: 'UnprocessableEntityError（処理できないエンティティ）',
  429: 'RateLimitError（レート制限エラー）',
  500: 'InternalServerError（サーバー内部エラー）',
  502: 'BadGatewayError（バッドゲートウェイエラー）',
  503: 'ServiceUnavailableError（サービス利用不可）',
  504: 'GatewayTimeoutError（ゲートウェイタイムアウトエラー）',
  'APIConnectionError': 'API接続エラー',
};

module.exports = statusCodes;
