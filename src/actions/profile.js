const {ActionTypes} = require('../core/constants')

const profile= {"mvPersonnalProfileBean":{"mvAccountNumber":"077C086378","mvAddress":"ADDRESS1 ADDRESS2 ADDRESS3","mvAgentList":[{"agentAttorney":"Place Order","agentIDNumber":"22334455","agentName":"Son","agentPhone":""}],"mvEmail":"","mvIDNumber":"123456789","mvName":"Tú Hoa Kiểm Tra sssssssssssssssssssssssssss","mvPhoneNumber":""},"mvResult":null}


export function getProfile(param) {
    return {
      type: ActionTypes.PROFILE,
      data: profile
    }
}
