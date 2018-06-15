import Web3 from 'web3';
import { abi } from '../../config';

export default {
  namespaced: true,
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null,
    },
    contractInstance: null,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    connectWeb3({state, rootState}) {
        if (typeof window.web3 !== 'undefined') {
            this.web3Instance = new Web3(window.web3.currentProvider);
            this.coinbase = this.web3Instance.eth.accounts[0];
            setInterval(() => {
            this.web3Instance.eth.getCoinbase((err, coinbase) => {
                if (err) {
                } else if (coinbase !== state.coinbase) {
                state.coinbase = coinbase;
                }
            });
            }, 100);
            var project = rootState.project.ito
            console.log(project)

            this.contractInstance = new this.web3Instance.eth.Contract(abi,project.contract_address)
        }
    },
    becomeInvestor({dispatch, state},value){
        if (!this.contractInstance){
            dispatch('connectWeb3')
        }
        return this.contractInstance.methods.becomeInvestor()
        .send({ from: state.coinbase, value:value })
        .on("receipt", function(receipt) {
            console.log(receipt)
        })
        .on("error", function(error) {
            console.log(error)
        });    
    }
  },
};
