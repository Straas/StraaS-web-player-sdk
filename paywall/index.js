window['StraaSOnInit'] = function StraaSOnInit() {
  const Paywall = window.StraaS.Paywall
  new Paywall(
    document.getElementById("main"),
    {
      targetInfo: {
        title: "",
        monetizationRules: [{amountCents: 1, validMinutes: 1}],
        hasPasscodeSet: true,
        accessible: true,
        monetizable: {
          id: 'otB8obc8',
          type: 'video'
        },
        reservedStartTime: '2017-06-01 08:00:00',
        preordered: false
      },
      language: 'en-US',
      appJwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOjgsImFjY291bnRfaWQiOiJ0cmlhbC5zdHJhYXMuaW8tdGVzdCIsImV4cCI6MTQ5NDMyOTI4NH0.IzLujP_00JpPPQgLnZ6jaHypr4HU8w9ztVm2-NDdhDY',
      memberJwt: ''
    }
  )
}